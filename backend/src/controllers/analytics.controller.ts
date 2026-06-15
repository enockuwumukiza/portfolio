import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { logger } from '../utils/logger';

// In-memory store for development; swap for DB in production
const eventLog: Array<{ event: string; meta: Record<string, unknown>; ts: string }> = [];

const trackSchema = z.object({
  event: z.enum([
    'page_view',
    'project_click',
    'resume_download',
    'contact_open',
    'github_click',
    'linkedin_click',
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

    eventLog.push(entry);
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
    const counts = eventLog.reduce<Record<string, number>>((acc, e) => {
      acc[e.event] = (acc[e.event] || 0) + 1;
      return acc;
    }, {});

    res.status(200).json({ status: 'success', data: counts, total: eventLog.length });
  } catch (err) {
    next(err);
  }
};
