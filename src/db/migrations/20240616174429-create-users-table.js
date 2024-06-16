/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rawQuery = `CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            salt VARCHAR(255) NOT NULL
            ); `;

    await queryInterface.sequelize.query(rawQuery);
  },
  async down(queryInterface, Sequelize) {
    const rawQuery = 'DROP TABLE users;';
    await queryInterface.sequelize.query(rawQuery);
  },
};
