const Sequelize = require("sequelize");
const parse = require("pg-connection-string").parse;
const config = parse('postgres://refbavfkyfzfzm:b0630fb54c74dcaed5844782a0432d967b04e8838148ccd4a2a969c7e2d8f591@ec2-52-6-77-239.compute-1.amazonaws.com:5432/de5cqvje6ho4ve');
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
