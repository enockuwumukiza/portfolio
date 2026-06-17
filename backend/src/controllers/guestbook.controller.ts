import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

// ── Prisma client — lazy-loaded (mirrors contact.controller.ts) ────────────────
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
    logger.warn('Prisma unavailable — guestbook will not be persisted to DB', err);
    return null;
  }
}

const createEntrySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(60),
  message: z.string().min(3, 'Message too short').max(500),
  link: z
    .string()
    .trim()
    .url('Link must be a valid URL')
    .max(200)
    .optional()
    .or(z.literal('')),
});

// Naive profanity / spam guard — keeps things low-effort but not empty.
// Not a substitute for real moderation, just a first filter.
const BLOCKED_PATTERNS = [/https?:\/\/.*https?:\/\//i, /<script/i, /\[url=/i];

function isLikelySpam(message: string): boolean {
  return BLOCKED_PATTERNS.some((pattern) => pattern.test(message));
}

export const listEntries = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const db = await getPrisma();

    if (!db) {
      // Graceful degradation — no DB configured locally
      res.status(200).json({ status: 'success', data: [] });
      return;
    }

    const limit = Math.min(Number(req.query.limit) || 50, 100);

    const entries = await db.guestbookEntry.findMany({
      where: { approved: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: { id: true, name: true, message: true, link: true, createdAt: true },
    });

    res.status(200).json({ status: 'success', data: entries });
  } catch (err) {
    next(err);
  }
};

export const createEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const payload = createEntrySchema.parse(req.body);

    if (isLikelySpam(payload.message)) {
      throw new AppError('Message rejected by spam filter.', 422);
    }

    const db = await getPrisma();
    if (!db) {
      throw new AppError('Guestbook is temporarily unavailable. Please try again later.', 503);
    }

    const entry = await db.guestbookEntry.create({
      data: {
        name: payload.name,
        message: payload.message,
        link: payload.link || null,
      },
      select: { id: true, name: true, message: true, link: true, createdAt: true },
    });

    logger.info(`New guestbook entry from ${payload.name}`);

    res.status(201).json({
      status: 'success',
      message: 'Thanks for signing the guestbook!',
      data: entry,
    });
  } catch (err) {
    next(err);
  }
};
