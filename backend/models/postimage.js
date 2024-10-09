'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostImage = sequelize.define('PostImage', {
    postId: DataTypes.INTEGER,
    image: DataTypes.STRING
  },{
    getterMethods: {
      url() {
        return `${process.env.BASE_URL}/uploads/images/posts/${this.image}`;
      }
    }
  });
  
  PostImage.associate = function(models) {
    PostImage.belongsTo(models.Post, { foreignKey: 'postId' });
  };
  
  
  
  return PostImage;
};
