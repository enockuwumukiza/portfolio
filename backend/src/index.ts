import 'dotenv/config';
import app from './app';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  logger.info(`🚀 Portfolio API running on http://localhost:${PORT}`);
  logger.info(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received — shutting down gracefully');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection:', reason);
  server.close(() => process.exit(1));
});
