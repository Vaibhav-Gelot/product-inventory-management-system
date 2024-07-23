const { createClient } = require('redis');
const logger = require('../../helpers/logger');

class RedisDB {
  constructor() {
    this.client = null;
  }

  init() {
    this.client = createClient({
      host: process.env.REDIS_DB_HOST,
      port: process.env.REDIS_DB_PORT,
      db: process.env.REDIS_DB_DATABASE,
    });
  }

  // eslint-disable-next-line consistent-return
  async connectDB() {
    try {
      await this.client.connect();
      logger.log('Redis : Connection has been established successfully.');
      return this.client;
    } catch (error) {
      logger.error('Database Error : redis database connection error...', error);
    }
  }

  async disconnectDB() {
    try {
      await this.client.disconnect();
      logger.log('Redis : Database connection disconnected...');
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
