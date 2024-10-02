module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define("Event", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      ticketPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
          const imagePath = this.getDataValue('image');
          return imagePath ? `${process.env.BASE_URL}/uploads/images/events/${imagePath}` : null; 
        },
      },
      
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      
    });
  
    Event.associate = (models) => {
      Event.belongsTo(models.EventCategory, {
        foreignKey: 'categoryId',
        as: 'category',
      });
    };
  
    return Event;
  };
  