import { existsSync, mkdirSync } from 'fs';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import config from '../config/config.js';

if (!existsSync(config.logDirectory)) {
  mkdirSync(config.logDirectory);
}

const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    logFormat
  ),
  transports: [
    // debug log setting
    new winstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: config.logDirectory + '/debug', // log file /logs/debug/*.log in save
      filename: '%DATE%.log',
      maxFiles: 30, // 30 Days saved
      json: false,
      zippedArchive: true
    }),
    // error log setting
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: config.logDirectory + '/error', // log file /logs/error/*.log in save
      filename: '%DATE%.log',
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true
    })
  ]
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(winston.format.splat(), winston.format.colorize())
  })
);

const stream = {
  write: (message) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  }
};

export { logger, stream };
