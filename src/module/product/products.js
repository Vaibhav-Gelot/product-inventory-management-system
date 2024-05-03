const productSQLModel = require('./products.sql.model');
const suppliersSQLModel = require('../supplier/suppliers.sql.model');
const Exception = require('../../helpers/exception');
const validation = require('../../utils/validation');

class Products {
  async addProduct(req, res) {
    try {
      const { name, supplier_id, price, stock_quantity } = req.body;
      if (!name || !validation.isString(name)) {
        throw new Exception('ValidationError', 'Invalid product name');
      }
      if (!supplier_id || !validation.isNumber(supplier_id)) {
        throw new Exception('ValidationError', 'Invalid supplier id.');
      }
      if (!validation.isNumber(price) || price < 1) {
        throw new Exception('ValidationError', 'Invalid product price.');
      }
      if (!validation.isNumber(stock_quantity) || stock_quantity < 1) {
        throw new Exception('ValidationError', 'Invalid product stock quantity.');
      }

      const isSupplierExists = await suppliersSQLModel.getSupplierById(supplier_id);
      if (!isSupplierExists || validation.isEmpty(isSupplierExists)) {
        throw new Exception('ObjectNotFoundError', 'Supplier does not exists.');
      }
      const isProductExists = await productSQLModel.getProductByName(name);
      if (!validation.isEmpty(isProductExists)) {
        throw new Exception('AlreadyObjectExistsError', 'Product already exists.');
      }
      const data = await productSQLModel.addProduct({ name, supplier_id, price, stock_quantity });
      res.sendResponse({ data });
    } catch (error) {
      console.log(error);
      res.sendError({ error: Exception.getExcetion(error, 'error while adding product.') });
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { name, supplier_id, price } = req.body;
      if (!id || !validation.isNumber(id)) {
        throw new Exception('ValidationError', 'Invalid Product id.');
      }
      if (!name || !validation.isString(name)) {
        throw new Exception('ValidationError', 'Invalid product name');
      }
      if (!supplier_id || !validation.isNumber(supplier_id)) {
        throw new Exception('ValidationError', 'Invalid supplier id.');
      }
      if (!validation.isNumber(price) || price < 1) {
        throw new Exception('ValidationError', 'Invalid product price.');
      }
      const isProductExists = await productSQLModel.getProductById(Number(id));
      if (!isProductExists || validation.isEmpty(isProductExists)) {
        throw new Exception('ObjectNotFoundError', 'Product does not exists.');
      }
      const isSupplierExists = await suppliersSQLModel.getSupplierById(supplier_id);
      if (!isSupplierExists || validation.isEmpty(isSupplierExists)) {
        throw new Exception('ObjectNotFoundError', 'Supplier does not exists.');
      }
      const isSameProductExists = await productSQLModel.getProductByName(name);
      if (!validation.isEmpty(isSameProductExists)) {
        throw new Exception('AlreadyObjectExistsError', 'New Product already exists.');
      }
      const data = await productSQLModel.updateProduct({ name, supplier_id, price, id });
      res.sendResponse({ data });
    } catch (error) {
      res.sendError({ error: Exception.getExcetion(error, 'error while updating product.') });
    }
  }

  async getProduct(req, res) {
    try {
      const { id } = req.params;
      if (!id || !validation.isNumber(id)) {
        throw new Exception('ValidationError', 'Invalid Product id.');
      }
      const data = await productSQLModel.getProductById(Number(id));
      res.sendResponse({ data });
    } catch (error) {
      res.sendError({ error: Exception.getExcetion(error, 'error while getting product.') });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      if (!id || !validation.isNumber(id)) {
        throw new Exception('ValidationError', 'Invalid Product id.');
      }
      const isProductExists = await productSQLModel.getProductById(Number(id));
      if (!isProductExists || validation.isEmpty(isProductExists)) {
        throw new Exception('ObjectNotFoundError', 'Product does not exists.');
      }
      const data = await productSQLModel.deleteProductById(Number(id));
      res.sendResponse({ data });
    } catch (error) {
      res.sendError({ error: Exception.getExcetion(error, 'error while getting product.') });
    }
  }

  async getProducts(req, res) {
    try {
      const { supplier_name = null, price_from = null, price_to = null } = req.query;
      if (supplier_name && !validation.isString(supplier_name)) {
        throw new Exception('ValidationError', 'Invalid supplier_name value.');
      }
      if (price_from && !validation.isNumber(price_from)) {
        throw new Exception('ValidationError', 'Invalid price_from id.');
      }
      if (price_to && !validation.isNumber(price_to)) {
        throw new Exception('ValidationError', 'Invalid price_from id.');
      }
      const data = await productSQLModel.getProducts({
        supplier_name: (supplier_name && supplier_name.trim()) || null,
        price_from: price_from ? Number(price_from) : null,
        price_to: price_to ? Number(price_to) : null,
      });
      res.sendResponse({ data });
    } catch (error) {
      res.sendError({ error: Exception.getExcetion(error, 'error while getting product list.') });
    }
  }

  async incrementProductQty(req, res) {
    try {
      const { id, qty } = req.params;
      if (!id || !validation.isNumber(id)) {
        throw new Exception('ValidationError', 'Invalid Product id.');
      }
      if (!qty || qty < 0 || !validation.isNumber(qty)) {
        throw new Exception('ValidationError', 'Invalid Product quantity.');
      }

      const isProductExists = await productSQLModel.getProductById(Number(id));
      if (!isProductExists || validation.isEmpty(isProductExists)) {
        throw new Exception('ObjectNotFoundError', 'Product does not exists.');
      }

      const data = await productSQLModel.incrementProductQty({ id: Number(id), stock_quantity: Number(qty) });
      res.sendResponse({ data });
    } catch (error) {
      res.sendError({ error: Exception.getExcetion(error, 'error while incrementing product stock.') });
    }
  }

  async decrementProductQty(req, res) {
    try {
      const { id, qty } = req.params;
      if (!id || !validation.isNumber(id)) {
        throw new Exception('ValidationError', 'Invalid Product id.');
      }
      if (!qty || qty < 0 || !validation.isNumber(qty)) {
        throw new Exception('ValidationError', 'Invalid Product quantity.');
      }
      const isProductExists = await productSQLModel.getProductById(Number(id));
      if (!isProductExists || validation.isEmpty(isProductExists)) {
        throw new Exception('ObjectNotFoundError', 'Product does not exists.');
      }
      const { stock_quantity } = isProductExists;
      if (Number(stock_quantity) < Number(qty)) {
        throw new Exception('ValidationError', 'Product stock insufficient.');
      }
      const data = await productSQLModel.decrementProductQty({ id: Number(id), qty: Number(qty) });
      res.sendResponse({ data });
    } catch (error) {
      res.sendError({ error: Exception.getExcetion(error, 'error while decrementing product stock.') });
    }
  }
}

module.exports = new Products();
