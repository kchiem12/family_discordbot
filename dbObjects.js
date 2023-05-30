const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "./db.sqlite",
});

const Messages = require("./models/Messages")(sequelize, Sequelize.DataTypes);

module.exports = { Messages };
