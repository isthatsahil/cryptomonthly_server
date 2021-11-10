const Sequelize = require("sequelize");
const sequelize = require("../db/server");

const Coins = sequelize.define("coins", {});

module.exports = Coins;
