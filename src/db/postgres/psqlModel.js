/* eslint-disable no-underscore-dangle */
class PSQLModel {
  constructor(connection) {
    this.dbConnection = connection;
  }

  async __callQuery({ query, data = [], connection = this.dbConnection, transaction = null }) {
    const [res, metaData] = await connection.query(query, { replacements: data, transaction });
    return { res, metaData };
  }

  async __callTransactionQueries({ queryfn, connection = this.dbConnection }) {
    const t = await connection.transaction();
    try {
      await queryfn(t);
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async executeQuery({ query, data = [], connection = this.dbConnection }) {
    return this.__callQuery({ query, data, connection });
  }

  async getQueryResult({ query, data = [], connection = this.dbConnection }) {
    const { res } = await this.__callQuery({ query, data, connection });
    return (res && res[0]) || {};
  }

  async getQueryResults({ query, data = [], connection = this.dbConnection }) {
    const { res } = await this.__callQuery({ query, data, connection });
    return res;
  }

  // Use for insert, update, delete
  async callQuery({ query, data = [], connection = this.dbConnection, transaction }) {
    const { res } = await this.__callQuery({ query, data, connection, transaction });
    return res && res[0];
  }

  async callTransactionQuery({ queryfn }) {
    return this.__callTransactionQueries({ queryfn });
  }
}
module.exports = PSQLModel;
