const Sequelize = require('sequelize');

const sequelize = new Sequelize('node','sahilverma','',{
    dialect : 'postgres',
    host : 'localhost',
})

module.exports = sequelize;