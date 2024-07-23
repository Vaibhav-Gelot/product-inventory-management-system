/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rawQuery = `ALTER TABLE products
    ADD CONSTRAINT fk_products_suppliers_supplier_id_and_id
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id);`;
    await queryInterface.sequelize.query(rawQuery);
  },
  async down(queryInterface, Sequelize) {
    const rawQuery = `ALTER TABLE products
   DROP CONSTRAINT fk_products_suppliers_supplier_id_and_id;`;
    await queryInterface.sequelize.query(rawQuery);
  },
};
