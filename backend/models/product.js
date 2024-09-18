'use strict';

module.exports = (sequelize, DataTypes) => {

  const baseURL = process.env.FRON_END_URL;

  const Product = sequelize.define('Product', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    size: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    color: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    subcategoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  });

  Product.associate = function(models) {
    Product.belongsTo(models.Subcategory, { foreignKey: 'subcategoryId', as: 'subcategory' });
    Product.belongsToMany(models.Color, { through: 'ProductColors', as: 'colors', foreignKey: 'productId' });
    Product.hasMany(models.ProductImage, { as: 'images' });
    Product.belongsToMany(models.User, {
      through: 'Wishlist',
      as: 'wishlistedBy',
      foreignKey: 'productId'
    });
  };
  
  return Product;
};
