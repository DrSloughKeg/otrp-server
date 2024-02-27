module.exports = (sequelize, DataTypes) => {
  const characters = sequelize.define(
    "characters",
    {
      charId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      charName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      str: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 99,
        },
      },
      dex: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 99,
        },
      },
      con: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 99,
        },
      },
      intl: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 99,
        },
      },
      wis: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 99,
        },
      },
      cha: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 99,
        },
      },
      evnt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 99,
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "userId" },
      },
    },
    { timestamps: false }
  );

  return characters;
};
