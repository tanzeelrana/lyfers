'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('products', 'is_soldout', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products', 'is_soldout');
  },
};
