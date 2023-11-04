const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Asset = sequelize.define("Asset", {
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
  make: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  model: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  serialNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  assignedTo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  laptop: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  mobile: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  desktop: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  assigned: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  warranty: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
});

module.exports = Asset;