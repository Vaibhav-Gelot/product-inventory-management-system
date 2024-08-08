const utils = require('../utils/utils');
const { requestParser, responseBuilder } = require('../middleware/index');
const postgres = require('../db/postgres');
const redisDB = require('../db/redis');
const Migration = require('../db/postgres/migrationRunner');
const logger = require('../helpers/logger');

class Module {
  constructor(app, port) {
    this.app = app;
    this.port = port;
    this.app.use(requestParser);
    this.app.use(responseBuilder);
    this.app.get('/', (req, res) => res.sendResponse({ data: 'Product Inventory Service Listening you!!....' }));
  }

  registerRoutes() {
    const controllers = utils.getFiles(__dirname, [], 'controller.js');
    controllers.forEach((controllerPath) => {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const Instance = require(controllerPath);
      // eslint-disable-next-line no-new
      const instance = new Instance(this.app);

      logger.info(`Route registed : ${instance.constructor.name}`);
    });

    this.wildCardRoute();
    logger.info('Server : Router registration done...');
  }

  wildCardRoute() {
    this.app.all('*', (req, res) => res.sendResponse({ data: 'Routes does not exists....' }));
  }

  async startServer() {
    this.server = this.app.listen(this.port, () => {
      logger.info(`"Product Inventory Service started : ${this.port}`);
    });
  }

  async initDBs() {
    // posgres
    const psqlDBConfig = {
      host: process.env.POSTGRESQL_DB_HOST,
      port: process.env.POSTGRESQL_DB_PORT,
      user: process.env.POSTGRESQL_DB_USER,
      password: process.env.POSTGRESQL_DB_PASSWORD,
      database: process.env.POSTGRESQL_DB_DATABASE,
    };
    await postgres.init(psqlDBConfig);
    global.dbConnection = await postgres.connectDBs();
    const migration = new Migration(global.dbConnection);
    await migration.up();

    // Redis
    if (process.env.NODE_ENV !== 'local') {
      console.log('process.env.NODE_ENV :', process.env.NODE_ENV);
      redisDB.init();
      global.redisConnection = await redisDB.connectDB();
    }
  }

  async initApp() {
    await this.initDBs();
    this.registerRoutes();
    await this.startServer();
    logger.info('Server : App initialization done...');
  }

  async shutdownApp() {
    if (process.env.NODE_ENV !== 'local') {
      await postgres.disconnectDBs();
    }

    await redisDB.disconnectDB();
    await this.server.close((err) => {
      logger.info('Server : App shutdown complete...', err);
      process.exit(0);
    });
  }
}

module.exports = Module;
