import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { logger } from '../utils/logger';

// ── Prisma client — lazy-loaded so startup works without DATABASE_URL ─────────
let prismaClient: import('@prisma/client').PrismaClient | null = null;

async function getPrisma() {
  if (prismaClient) return prismaClient;
  const { env } = await import('../config/env');
  if (!env.DATABASE_URL) return null;
  try {
    const { PrismaClient } = await import('@prisma/client');
    prismaClient = new PrismaClient({ log: ['error'] });
    await prismaClient.$connect();
    return prismaClient;
  } catch (err) {
    logger.warn('Prisma unavailable — analytics will use in-memory store', err);
    return null;
  }
}

// In-memory fallback (used when no DATABASE_URL)
const eventLog: Array<{ event: string; meta: Record<string, unknown>; ts: string }> = [];

const trackSchema = z.object({
  event: z.enum([
    'page_view',
    'project_click',
    'resume_download',
    'contact_open',
    'github_click',
    'linkedin_click',
    'email_click',
  ]),
  meta: z.record(z.unknown()).optional(),
});

export const trackEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { event, meta = {} } = trackSchema.parse(req.body);

    const entry = {
      event,
      meta: {
        ...meta,
        ip: req.ip,
        ua: req.headers['user-agent'],
        ref: req.headers['referer'],
      },
      ts: new Date().toISOString(),
    };

    // Try DB first, fall back to in-memory
    const db = await getPrisma();
    if (db) {
      await db.analyticsEvent.create({
        data: {
          event,
          meta: entry.meta,
          ip: req.ip ?? null,
          userAgent: (req.headers['user-agent'] as string) ?? null,
          referrer: (req.headers['referer'] as string) ?? null,
        },
      });
    } else {
      eventLog.push(entry);
    }

    logger.debug(`Analytics: ${event}`, meta);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const getStats = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const db = await getPrisma();

    if (db) {
      // Aggregate from DB
      const rows = await db.analyticsEvent.groupBy({
        by: ['event'],
        _count: { event: true },
        orderBy: { _count: { event: 'desc' } },
      });
      const counts: Record<string, number> = {};
      let total = 0;
      rows.forEach((r: { event: string; _count: { event: number } }) => {
        counts[r.event] = r._count.event;
        total += r._count.event;
      });
      res.status(200).json({ status: 'success', data: counts, total, source: 'db' });
    } else {
      // Aggregate from in-memory
      const counts = eventLog.reduce<Record<string, number>>((acc, e) => {
        acc[e.event] = (acc[e.event] || 0) + 1;
        return acc;
      }, {});
      res.status(200).json({ status: 'success', data: counts, total: eventLog.length, source: 'memory' });
    }
  } catch (err) {
    next(err);
  }
};
