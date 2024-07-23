const PSQLModel = require('../../db/postgres/psqlModel');

class AuthSQLModel extends PSQLModel {
  constructor() {
    super(global.dbConnection);
  }

  async addUser({ username, password, salt }) {
    const query = `INSERT INTO users (username, password, salt) VALUES (?, ?, ?) RETURNING *;`;
    return this.callQuery({ query, data: [username, password, salt] });
  }

  async getUser({ username }) {
    const query = `SELECT * FROM users WHERE username=?; `;
    return this.getQueryResult({ query, data: [username] });
  }
}
module.exports = new AuthSQLModel();
