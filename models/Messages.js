module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "messages",
    {
      gpt_message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      user_message: {
        type: DataTypes.TEXT,
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
