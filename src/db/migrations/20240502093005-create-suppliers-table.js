module.exports = {
  async up (queryInterface, Sequelize) {
    const rawQuery=`CREATE TABLE suppliers (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            contact_information TEXT);`
    await queryInterface.sequelize.query(rawQuery);
  },
  async down (queryInterface, Sequelize) {
   const rawQuery='DROP TABLE suppliers'
   await queryInterface.sequelize.query(rawQuery);
  }
};
