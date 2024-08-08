const winston = require('winston');
const fs = require('fs');
const path = require('path');

const { combine, timestamp, printf, colorize, align } = winston.format;

class Logger {
  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: combine(
        colorize({ all: true }),
        timestamp({
          format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level} : ${info.message.trim()}`),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: path.join('logs', 'inventory-service.log'),
          maxsize: 1024 * 1024 * 5, // 5MB
          maxFiles: 5,
          tailable: true,
        }),
      ],
      exitOnError: false,
    });
  }

  info(message) {
    this.logger.info(message);
  }

  error(message, error = '') {
    this.logger.error(`${message} : ${JSON.stringify(error)}`);
  }

  warn(message) {
    this.logger.warn(message);
  }
}
module.exports = new Logger();
