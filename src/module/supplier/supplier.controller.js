const express = require('express');

const router = express.Router();
const suppliers = require('./suppliers');

const { validateAccessToken } = require('../../middleware');

class SupplierController {
  constructor(app) {
    router.get('/:id', suppliers.getSupplier);
    router.post('/', suppliers.addSupplier);
    app.use('/api/v1/suppliers', validateAccessToken, router);
  }
}
module.exports = SupplierController;
