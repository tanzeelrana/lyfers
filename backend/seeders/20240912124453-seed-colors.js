'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Colors', [
      { name: 'Red', code: '#FF0000', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Blue', code: '#0000FF', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Green', code: '#008000', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Black', code: '#000000', createdAt: new Date(), updatedAt: new Date() },
      { name: 'White', code: '#FFFFFF', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Colors', null, {});
  }
};
