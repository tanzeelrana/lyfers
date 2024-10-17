'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  
  Group.associate = function(models) {
    Group.hasMany(models.Post, { foreignKey: 'groupId' });
  };
  
  return Group;
};
