const utils = require('../utils/utils');
const responseHandler = require('../helpers/responseHandler');
const postgres = require('../db/postgres');
const Migration = require('../db/migrationRunner');

class Module {
  constructor(app, port) {
    this.app = app;
    this.port = port;
    this.app.use(responseHandler);
    this.app.get('/', (req, res) => res.sendResponse({ data: 'Product Inventory Service Listening you!!....' }));
  }

  registerRoutes() {
    const controllers = utils.getFiles(__dirname, [], 'controller.js');
    controllers.forEach((controllerPath) => {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const Instance = require(controllerPath);
      // eslint-disable-next-line no-new
      new Instance(this.app);
    });
    this.wildCardRoute();
    console.log('Server : Router registration done...');
  }

  wildCardRoute() {
    this.app.all('*', (req, res) => res.sendResponse({ data: 'Routes does not exists....' }));
  }

  async startServer() {
    this.server = this.app.listen(this.port, () => {
      console.log(`"Product Inventory Service started : ${this.port}`);
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
    console.log('Server : App initialization done...');
  }

  async shutdownApp() {
    await postgres.disconnectDBs();
    await this.server.close((err) => {
      console.log('Server : App shutdown complete...', err);
      process.exit(0);
    });
  }
}

module.exports = Module;
