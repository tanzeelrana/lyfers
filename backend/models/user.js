'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qr_code: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    user_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    security_question_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'SecurityQuestions', 
        key: 'id',
      },
    },
    security_answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0, 
    },
  });

  User.beforeSave(async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.associate = (models) => {
    User.belongsTo(models.SecurityQuestions, {
      foreignKey: 'security_question_id',
      as: 'securityQuestion',
    });
  };

  return User;
};
