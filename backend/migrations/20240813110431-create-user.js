'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Ensure email is unique
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      qr_code: {
        type: Sequelize.STRING,
        allowNull: true, // QR code is optional
      },
      user_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      security_question_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'SecurityQuestions', // Ensure this model exists
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      security_answer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      points: {
        type: Sequelize.INTEGER,
        defaultValue: 0, // Default value for points
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
