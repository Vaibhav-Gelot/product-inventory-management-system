const redis = require('redis');
const logger = require('../../helpers/logger');

class RedisDB {
  constructor() {
    this.client = null;
  }

  init() {
    this.client = redis.createClient({
      socket: {
        host: process.env.REDIS_DB_HOST,
        port: Number(process.env.REDIS_DB_PORT),
      },
    });

    this.client.on('connect', () => {
      console.log('Connected to Redis');
    });
    this.client.on('error', (error) => {
      console.error('Redis error:', error);
    });
  }

  // eslint-disable-next-line consistent-return
  async connectDB() {
    if (this.client && this.client.isOpen) {
      logger.info('Redis : Connection already established.');
      return this.client;
    }
    try {
      await this.client.connect();
      logger.info('Redis : Connection has been established successfully.');
      this.client.set('hello', 'wloe');
      return this.client;
    } catch (error) {
      console.error(error);
      logger.error('Database Error : redis database connection error...', error);
    }
  }

  async disconnectDB() {
    try {
      if (this.client && this.client.isOpen) {
        await this.client.disconnect();
        logger.info('Redis : Database connection disconnected...');
      }
    } catch (error) {
      logger.error('Database Error : redis database disconnection error...', error);
      throw error;
    }
  }

  async getRediConn() {
    return this.client || null;
  }
}

module.exports = new RedisDB();
