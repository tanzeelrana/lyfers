'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert dummy data into EventCategories
    await queryInterface.bulkInsert('EventCategories', [
      { name: 'Music', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sports', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Theater', createdAt: new Date(), updatedAt: new Date() },
    ], {});

    // Insert dummy data into Events
    await queryInterface.bulkInsert('Events', [
      {
        title: 'Rock Concert',
        categoryId: 1, // Assuming Music category has ID 1
        date: new Date('2024-09-01'),
        ticketPrice: 50.00,
        description: 'A thrilling rock concert featuring popular bands.',
        image: 'rock-concert.jpg',
        location:'liverpol',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Football Match',
        categoryId: 2, // Assuming Sports category has ID 2
        date: new Date('2024-10-05'),
        ticketPrice: 30.00,
        description: 'An exciting football match between top teams.',
        image: 'football-match.jpg',
        location:'liverpol',

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Shakespeare Play',
        categoryId: 3, // Assuming Theater category has ID 3
        date: new Date('2024-11-15'),
        ticketPrice: 40.00,
        description: 'A captivating performance of a classic Shakespeare play.',
        image: 'shakespeare-play.jpg',
        location:'liverpol',

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Remove all data from EventCategories
    await queryInterface.bulkDelete('EventCategories', null, {});

    // Remove all data from Events
    await queryInterface.bulkDelete('Events', null, {});
  }
};
