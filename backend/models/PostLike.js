'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostLike = sequelize.define('PostLike', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Assuming you have a User model defined
        key: 'id',
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts', // Assuming you have a Post model defined
        key: 'id',
      },
    },
  }, {
    tableName: 'postLikes', // Updated table name
    timestamps: true, // Creates 'createdAt' and 'updatedAt' fields
    indexes: [
      {
        unique: true,
        fields: ['userId', 'postId'], // Ensure uniqueness for user-post pairs
      },
    ],
  });

  PostLike.associate = (models) => {
    // Associations
    PostLike.belongsTo(models.User, { foreignKey: 'userId' });
    PostLike.belongsTo(models.Post, { foreignKey: 'postId' });
  };

  return PostLike;
};
