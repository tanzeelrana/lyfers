'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert categories into the Categories table
    return queryInterface.bulkInsert('Categories', [
      { name: 'Apparel', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Accessories', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Home & Living', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tech Gadgets', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Beauty & Wellness', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Books & Stationery', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Kids & Babies', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all categories
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
