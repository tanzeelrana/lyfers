'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('CartItems', 'color', {
      type: Sequelize.STRING,
      allowNull: true,  
    });

    await queryInterface.addColumn('CartItems', 'size', {
      type: Sequelize.STRING,
      allowNull: true,  
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('CartItems', 'color');
    await queryInterface.removeColumn('CartItems', 'size');
  }
};
