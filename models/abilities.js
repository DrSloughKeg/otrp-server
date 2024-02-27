module.exports = (sequelize, DataTypes) => {
  const abilities = sequelize.define(
    "abilities",
    {
      abilityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      abilityName: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      apCost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 99,
        },
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
    },
    { timestamps: false }
  );

  return abilities;
};
