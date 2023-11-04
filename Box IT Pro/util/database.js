const Sequelize = require("sequelize");

const sequelize = new Sequelize("boxit-pro", "root", "Root@123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
