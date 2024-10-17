'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserReferralPoints = sequelize.define('UserReferralPoints', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    referral_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    referral_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'user_referral_points',
    timestamps: true,
  });

  UserReferralPoints.associate = function(models) {
    UserReferralPoints.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return UserReferralPoints;
};
