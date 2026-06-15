import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { sendContactEmail } from '../services/email.service';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

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
    await sendContactEmail(payload);

    logger.info(`Contact form submitted: ${payload.name} (${payload.type})`);

    res.status(200).json({
      status: 'success',
      message: 'Message received! I'll get back to you within 24 hours.',
    });
  } catch (err) {
    next(err);
  }
};
