'use strict';

module.exports = (sequelize, DataTypes) => {
  const Testimonial = sequelize.define('Testimonial', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
  });

  Testimonial.associate = (models) => {
    Testimonial.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return Testimonial;
};
