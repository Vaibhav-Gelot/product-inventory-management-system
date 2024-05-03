const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

const Module = require('./module');

const ModuleInstance = new Module(app, port);
ModuleInstance.initApp();
