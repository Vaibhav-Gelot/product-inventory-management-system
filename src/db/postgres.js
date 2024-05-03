const Sequelize = require('sequelize');

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
      console.log('Postgres : Connection has been established successfully.');
      return this.sequelize;
    } catch (error) {
      console.error('Database Error : postgres database connection error...', error);
    }
  }

  async disconnectDBs() {
    try {
      await this.sequelize.close();
      console.log('Database : postgres database disconnected...');
    } catch (error) {
      console.error('Database Error : postgres database disconnection error...', error);
    }
  }
}
module.exports = new PostgreSQL();
