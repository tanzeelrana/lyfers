"use strict";
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
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
        model: "SecurityQuestions",
        key: "id",
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
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address_email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  User.beforeSave(async (user) => {
    if (user.changed("password")) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.associate = (models) => {
    User.belongsTo(models.SecurityQuestions, {
      foreignKey: "security_question_id",
      as: "securityQuestion",
    });
  };
  User.associate = function(models) {
    User.hasMany(models.UserReferralPoints, { foreignKey: 'user_id' });
  };

  return User;
};
