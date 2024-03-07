module.exports = (sequelize, DataTypes) => {
  const inventories = sequelize.define(
    "inventories",
    {
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "items", key: "itemId" },
      },
      charId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "characters", key: "charId" },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 99,
        },
      },
    },
    { timestamps: false }
  );

  return inventories;
};
