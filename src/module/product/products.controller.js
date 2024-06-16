const express = require('express');

const router = express.Router();

const products = require('./products');

const { validateAccessToken } = require('../../middleware');

class ProductController {
  constructor(app) {
    router.get('/', products.getProducts);
    router.post('/', products.addProduct);
    router.get('/:id', products.getProduct);
    router.put('/:id', products.updateProduct);
    router.delete('/:id', products.deleteProduct);
    router.put('/:id/stock/:qty/increment', products.incrementProductQty);
    router.put('/:id/stock/:qty/decrement', products.decrementProductQty);
    app.use('/api/v1/products', validateAccessToken, router);
  }
}

module.exports = ProductController;
