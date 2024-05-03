const PSQLModel = require('../../db/psqlModel');

class SuppliersSQLModel extends PSQLModel {
  constructor() {
    super(global.dbConnection);
  }

  async getSupplierById(id) {
    const query = `SELECT * FROM Suppliers WHERE id=?;`;
    return this.getQueryResult({ query, data: [id] });
  }

  async getSupplierByName(name) {
    const query = `SELECT * FROM Suppliers WHERE name=?;`;
    return this.getQueryResult({ query, data: [name] });
  }

  async addSupplier({ name, contact_information }) {
    const query = `INSERT INTO Suppliers (name, contact_information) VALUES (?, ?);`;
    return this.callQuery({ query, data: [name, contact_information] });
  }
}
module.exports = new SuppliersSQLModel();
