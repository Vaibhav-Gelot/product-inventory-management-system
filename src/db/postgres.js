const Sequelize = require('sequelize');
const logger = require('../helpers/Logger');

class PostgreSQL {
  async init({ host, port, user, password, database }) {
    this.sequelize = new Sequelize(database, user, password, {
      dialect: 'postgres',
      host,
      port,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });
  }

  // eslint-disable-next-line consistent-return
  async connectDBs() {
    try {
      await this.sequelize.authenticate();
      logger.log('Postgres : Connection has been established successfully.');
      return this.sequelize;
    } catch (error) {
      logger.error('Database Error : postgres database connection error...', error);
    }
  }

  async disconnectDBs() {
    try {
      await this.sequelize.close();
      logger.log('Database : postgres database disconnected...');
    } catch (error) {
      logger.error('Database Error : postgres database disconnection error...', error);
    }
  }
}
module.exports = new PostgreSQL();
