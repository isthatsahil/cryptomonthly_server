const Sequelize = require("sequelize");
require('dotenv').config();

const parse = require("pg-connection-string").parse;
const config = parse(process.env.DATABASE_URL);
const sequelize = new Sequelize(config.database,config.user,config.password,{
    dialect : 'postgres',
    host : config.host,
    port : config.port,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

module.exports = sequelize;
