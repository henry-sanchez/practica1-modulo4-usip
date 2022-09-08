'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Users', 'email', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
      ]);
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'email', { transaction: t }),
      ]);
    });
  }
};
