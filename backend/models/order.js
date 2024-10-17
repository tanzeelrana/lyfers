'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
    },
    status: {
    type: DataTypes.ENUM('pending','shipped', 'completed', 'canceled'),
      defaultValue: 'pending',
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    shippingAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    billingAddress: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    paymentMethod: {
      type: DataTypes.ENUM('credit card', 'PayPal', 'Venmo'),
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  Order.associate = function(models) {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Order.hasMany(models.OrderItem, {
      foreignKey: 'orderId',
      as: 'orderItems',
    });
  };

  return Order;
};
