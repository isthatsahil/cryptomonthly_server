const Sequelize = require("sequelize");
const sequelize = require("../db/server");

const Images = sequelize.define("images", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  imageName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Images;
