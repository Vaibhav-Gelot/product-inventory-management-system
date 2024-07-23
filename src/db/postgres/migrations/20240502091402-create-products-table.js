/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rawQuery = `CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            supplier_id INT,
            price DECIMAL(10, 2),
            stock_quantity INT,
            images TEXT);`;

    await queryInterface.sequelize.query(rawQuery);
  },
  async down(queryInterface, Sequelize) {
    const rawQuery = 'DROP TABLE products;';
    await queryInterface.sequelize.query(rawQuery);
  },
};
