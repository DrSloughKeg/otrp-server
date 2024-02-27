module.exports = (sequelize, DataTypes) => {
  const charabilities = sequelize.define(
    "charabilities",
    {
      abilityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "abilities", key: "abilityId" },
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

  return charabilities;
};
