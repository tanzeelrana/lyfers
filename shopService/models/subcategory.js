module.exports = (sequelize, DataTypes) => {
  const Subcategory = sequelize.define('Subcategory', {
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {});
  
  Subcategory.associate = function(models) {
    Subcategory.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    Subcategory.hasMany(models.Product, { foreignKey: 'subcategoryId', as: 'products' });
  };
  
  return Subcategory;
};
