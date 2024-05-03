const winston = require('winston');

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
      transports: [new winston.transports.Console()],
    });
  }

  log(message) {
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
