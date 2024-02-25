module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return users;
};
