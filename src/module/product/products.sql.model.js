const PSQLModel = require('../../db/postgres/psqlModel');

class ProductsSQLModel extends PSQLModel {
  constructor() {
    super(global.dbConnection);
  }

  async getProductById(id) {
    const query = `SELECT * FROM Products WHERE id=?;`;
    return this.getQueryResult({ query, data: [id] });
  }

  async getProductByName(name) {
    const query = `SELECT * FROM Products WHERE name=?;`;
    return this.getQueryResult({ query, data: [name] });
  }

  async addProduct({ name, supplier_id, price, stock_quantity }) {
    const query = `INSERT INTO Products (name, supplier_id, price, stock_quantity) VALUES (?, ?, ?, ?);`;
    return this.callQuery({ query, data: [name, supplier_id, price, stock_quantity] });
  }

  async updateProduct({ name, supplier_id, price, id }) {
    const query = `UPDATE Products SET name = ?, supplier_id = ?, price = ? WHERE id=?;`;
    return this.callQuery({ query, data: [name, supplier_id, price, id] });
  }

  async incrementProductQty({ stock_quantity, id }) {
    return this.callTransactionQuery({
      queryfn: async (tnx) =>
        this.callQuery({
          query: `UPDATE Products SET stock_quantity = stock_quantity + ? WHERE id=?;`,
          data: [stock_quantity, id],
          transaction: tnx,
        }),
    });
  }

  async decrementProductQty({ qty, id }) {
    return this.callTransactionQuery({
      queryfn: async (tnx) => {
        const { stock_quantity } = await this.callQuery({
          query: `SELECT * FROM Products WHERE id=?;`,
          data: [id],
          transaction: tnx,
        });
        if (stock_quantity < qty) {
          throw new Error('Insufficient product qty.');
        }
        return this.callQuery({
          query: `UPDATE Products SET stock_quantity = stock_quantity - ? WHERE id=? AND stock_quantity>=?;`,
          data: [qty, id, qty],
          transaction: tnx,
        });
      },
    });
  }

  async deleteProductById(id) {
    const query = `DELETE FROM Products WHERE id=?;`;
    return this.callQuery({ query, data: [id] });
  }

  async getProducts({ supplier_name, price_from, price_to }) {
    const data = [];
    if (supplier_name) data.push(supplier_name);
    if (price_from && price_to) data.push(price_from, price_to);
    const query = `SELECT 
                        p.id as product_id,
                        p.name as product_name,
                        p.price,
                        p.stock_quantity,
                        s.id as supplier_id,
                        s.name as supplier_name,
                        s.contact_information as supplier_contact_information 
                    FROM Products as p
                    LEFT JOIN Suppliers as s ON p.supplier_id=s.id 
                    ${supplier_name || (price_from && price_to) ? 'WHERE' : ''}
                    ${supplier_name ? 's.name=?' : ''} 
                    ${supplier_name && price_from && price_to ? 'AND' : ''}
                    ${price_from && price_to ? 'p.price BETWEEN ? AND ? ' : ''};`;
    return this.getQueryResults({
      query,
      data,
    });
  }
}
module.exports = new ProductsSQLModel();
