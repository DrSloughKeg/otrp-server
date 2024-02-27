module.exports = (sequelize, DataTypes) => {
  const items = sequelize.define(
    "items",
    {
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      itemName: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      effect: {
        type: DataTypes.STRING(144),
        allowNull: true,
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: -99,
          max: 99,
        },
      },
      text: {
        type: DataTypes.STRING(144),
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
          max: 99,
        },
      },
    },
    { timestamps: false }
  );

  return items;
};
