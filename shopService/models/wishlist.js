'use strict';

module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define('Wishlist', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Product',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    tableName: 'Wishlists',
    timestamps: true
  });

  Wishlist.associate = function(models) {
    Wishlist.belongsTo(models.Product, { foreignKey: 'productId' });
  };

  return Wishlist;
};
