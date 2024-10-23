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
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      qr_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      security_question_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'SecurityQuestions',
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
        defaultValue: 0,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: true, 
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      address_email: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      postalCode: {
        type: Sequelize.STRING,
        allowNull: true, 
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
