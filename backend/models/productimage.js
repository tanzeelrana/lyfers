'use strict';

module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define('ProductImage', {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    }
    
  },{
    getterMethods: {
      fullPath() {
        return `${process.env.BASE_URL}/uploads/images/products/${this.image}`;
      }
    }
  });

  ProductImage.associate = function(models) {
    ProductImage.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  };

  return ProductImage;
};
