module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      completed: DataTypes.STRING,
      user: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
  return Todo;
};
