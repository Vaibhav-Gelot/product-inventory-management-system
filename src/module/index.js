const utils = require('../utils/utils');
const { requestParser, responseBuilder } = require('../middleware/index');
const postgres = require('../db/postgres');
const Migration = require('../db/migrationRunner');
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

      logger.log(`Route registed : ${instance.constructor.name}`);
    });

    this.wildCardRoute();
    logger.log('Server : Router registration done...');
  }

  wildCardRoute() {
    this.app.all('*', (req, res) => res.sendResponse({ data: 'Routes does not exists....' }));
  }

  async startServer() {
    this.server = this.app.listen(this.port, () => {
      logger.log(`"Product Inventory Service started : ${this.port}`);
    });
  }

  async initApp() {
    const dbConfig = {
      host: process.env.POSTGRESQL_DB_HOST,
      port: process.env.POSTGRESQL_DB_PORT,
      user: process.env.POSTGRESQL_DB_USER,
      password: process.env.POSTGRESQL_DB_PASSWORD,
      database: process.env.POSTGRESQL_DB_DATABASE,
    };
    await postgres.init(dbConfig);
    global.dbConnection = await postgres.connectDBs();
    const migration = new Migration(global.dbConnection);
    await migration.up();

    this.registerRoutes();
    await this.startServer();
    logger.log('Server : App initialization done...');
  }

  async shutdownApp() {
    await postgres.disconnectDBs();
    await this.server.close((err) => {
      logger.log('Server : App shutdown complete...', err);
      process.exit(0);
    });
  }
}

module.exports = Module;
