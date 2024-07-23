// index.js
const { Umzug, SequelizeStorage } = require('umzug');
const Sequelize = require('sequelize');
const logger = require('../../helpers/logger');

class Migration {
  constructor(sequelize) {
    this.umzug = new Umzug({
      migrations: {
        glob: ['migrations/*.js', { cwd: __dirname }],
        resolve: ({ name, path, context }) => {
          // eslint-disable-next-line import/no-dynamic-require, global-require
          const migration = require(path);
          return {
            name,
            up: async () => migration.up(context, Sequelize),
            down: async () => migration.down(context, Sequelize),
          };
        },
      },
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize }),
      logger: console,
    });
  }

  async up() {
    try {
      await this.umzug.up();
      logger.log('Database Migration  : postgres database migration has been executed successuly...');
    } catch (error) {
      logger.error('Database Migration Error : postgres database migration error...', error);
    }
  }
}
module.exports = Migration;
