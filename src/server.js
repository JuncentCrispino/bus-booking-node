import 'dotenv/config';
import app from './app.js';
import environment from './config/environment.js';
import sql from './databases/busBookingDB.js';
import { logger } from './utils/logger.js';

sql.raw('SELECT 1').then(() => {
  app.listen(environment.port, () => {
    logger.info('Connected to the database');
    logger.info(`Listening to port ${environment.port}`);
  });
});
