import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../utils/logger';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError | ZodError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Zod validation error
  if (err instanceof ZodError) {
    res.status(422).json({
      status: 'error',
      message: 'Validation failed',
      errors: err.flatten().fieldErrors,
    });
    return;
  }

  // Operational / known error
  if (err instanceof AppError && err.isOperational) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
    return;
  }

  // Unknown / programming error
  logger.error('Unexpected error:', err);
  res.status(500).json({
    status: 'error',
    message:
      process.env.NODE_ENV === 'production'
        ? 'Something went wrong. Please try again.'
        : err.message,
  });
};
