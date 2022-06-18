import 'dotenv/config';
import app from './app.js';
import config from './config/config.js';
import sql from './databases/busBookingDB.js';
import { logger } from './utils/logger.js';

let server;
sql.raw('SELECT 1').then(() => {
  server = app.listen(config.port, () => {
    logger.info('=================================');
    logger.info(`======= ENV:  ${config.env} =======`);
    logger.info(`🚀 App listening on the port ${config.port}`);
    logger.info('=== Connected to the database ===');
    logger.info('=================================');

  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
