'use strict';

module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define('Wishlist', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      },
      onDelete: 'CASCADE'
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
    Wishlist.belongsTo(models.User, { foreignKey: 'userId' });
    Wishlist.belongsTo(models.Product, { foreignKey: 'productId' });
  };

  return Wishlist;
};
