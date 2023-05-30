module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "messages",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      gpt_message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
