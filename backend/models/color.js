'use strict';
module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define('Color', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  Color.associate = function(models) {
    Color.belongsToMany(models.Product, { through: 'ProductColors', as: 'products', foreignKey: 'colorId' });
  };

  return Color;
};
