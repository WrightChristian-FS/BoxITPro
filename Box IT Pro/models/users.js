const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  department: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  office: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  computer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  deskphone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cellphone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = User;
