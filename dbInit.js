const Sequelize = require("sequelize");

// init database
const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

const Messages = require("./models/Messages")(sequelize, Sequelize.DataTypes);

const force = process.argv.includes("--force") || process.argv.includes("-f");

Messages.sync({ force })
  .then(async () => {
    console.log("Database synced");

    sequelize.close();
  })
  .catch(console.error);
