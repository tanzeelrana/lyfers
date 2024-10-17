module.exports = (sequelize, DataTypes) => {
    const EventCategory = sequelize.define("EventCategory", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    EventCategory.associate = (models) => {
      EventCategory.hasMany(models.Event, {
        foreignKey: 'categoryId',
        as: 'events',
        onDelete: "cascade",
      });
    };
  
    return EventCategory;
  };
  