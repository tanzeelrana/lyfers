'use strict';

module.exports = (sequelize, DataTypes) => {
  const SecurityQuestions = sequelize.define('SecurityQuestions', {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  SecurityQuestions.associate = (models) => {
    // Define associations here if needed
  };

  return SecurityQuestions;
};
