'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    groupId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  
  Post.associate = function(models) {
    Post.belongsTo(models.Group, { foreignKey: 'groupId' });
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Post.hasMany(models.PostImage, { foreignKey: 'postId' });
    Post.hasMany(models.Comment, { foreignKey: 'postId' });
  };
  
  return Post;
};
