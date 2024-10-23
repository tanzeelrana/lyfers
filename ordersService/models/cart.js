module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: DataTypes.INTEGER
  }, {});
  
  Cart.associate = function(models) {
    // Cart.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Cart.hasMany(models.CartItem, { foreignKey: 'cartId' });
  };
  
  return Cart;
};
