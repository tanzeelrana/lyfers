'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const products = [
      {
        title: 'Classic Red T-Shirt',
        description: 'A stylish red t-shirt for everyday wear.',
        image: 'https://example.com/images/red-tshirt.jpg',
        quantity: 50,
        price: 19.99,
        size: JSON.stringify(['S', 'M', 'L']),
        color: JSON.stringify(['Red']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Blue Denim Jeans',
        description: 'Comfortable blue denim jeans with a modern fit.',
        image: 'https://example.com/images/blue-jeans.jpg',
        quantity: 30,
        price: 39.99,
        size: JSON.stringify(['M', 'L', 'XL']),
        color: JSON.stringify(['Blue']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Black Leather Jacket',
        description: 'A sleek black leather jacket for a bold look.',
        image: 'https://example.com/images/black-jacket.jpg',
        quantity: 20,
        price: 129.99,
        size: JSON.stringify(['S', 'M', 'L']),
        color: JSON.stringify(['Black']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more products as needed
    ];

    await queryInterface.bulkInsert('Products', products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
