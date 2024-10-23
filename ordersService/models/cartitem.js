module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    cartId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    color: DataTypes.STRING,
    size: DataTypes.STRING,
   
  }, {});
  
  CartItem.associate = function(models) {
    CartItem.belongsTo(models.Cart, { foreignKey: 'cartId', onDelete: 'CASCADE' });
  };
  
  return CartItem;
};
