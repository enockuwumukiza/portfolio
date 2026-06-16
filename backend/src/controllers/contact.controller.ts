import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { sendContactEmail } from '../services/email.service';
import { logger } from '../utils/logger';

// ── Prisma client — lazy-loaded ───────────────────────────────────────────────
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
    logger.warn('Prisma unavailable — contact messages will not be persisted to DB', err);
    return null;
  }
}

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject too short').max(120),
  message: z.string().min(10, 'Message too short').max(2000),
  type: z.enum(['collaboration', 'hiring', 'general']).default('general'),
});

export const submitContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const payload = contactSchema.parse(req.body);

    // 1. Send email (primary — always runs)
    await sendContactEmail(payload);

    // 2. Persist to DB if available (secondary — graceful degradation)
    const db = await getPrisma();
    if (db) {
      await db.contactMessage.create({
        data: {
          name: payload.name,
          email: payload.email,
          subject: payload.subject,
          message: payload.message,
          type: payload.type,
        },
      });
      logger.info(`Contact message persisted to DB: ${payload.name} (${payload.type})`);
    }

    logger.info(`Contact form submitted: ${payload.name} <${payload.email}> [${payload.type}]`);

    res.status(200).json({
      status: 'success',
      message: "Message received! I'll get back to you within 24 hours.",
    });
  } catch (err) {
    next(err);
  }
};
