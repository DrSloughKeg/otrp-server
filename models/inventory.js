module.exports = (sequelize, DataTypes) => {
  const inventory = sequelize.define(
    "inventory",
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
    },
    { timestamps: false }
  );

  return inventory;
};
