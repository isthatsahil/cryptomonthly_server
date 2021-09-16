const Sequelize = require('sequelize');
const sequelize = require('../db/server');

const Portfolio = sequelize.define('portfolio', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false,
    },
    coin : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    date : {
        type : Sequelize.DATE,
        allowNull : true,
    },
    quantity : {
        type : Sequelize.DECIMAL,
        allowNull : true,
    },
    costPrice : {
        type : Sequelize.DECIMAL,
        allowNull : false,
    },
    sellingPrice : {
        type : Sequelize.DECIMAL,
        allowNull : true,
    },
    user : {
        type : Sequelize.STRING,
        allowNull : false,
    }
})

module.exports = Portfolio;