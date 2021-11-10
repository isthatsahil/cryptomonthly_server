/**
 * @description : Cloud DB connection
 */

// const Sequelize = require("sequelize");
// require('dotenv').config();
// const parse = require("pg-connection-string").parse;
// const config = parse(process.env.DATABASE_URL);
// const sequelize = new Sequelize(config.database,config.user,config.password,{
//     dialect : 'postgres',
//     host : config.host,
//     port : config.port,
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     }
// })

// module.exports = sequelize;

/**
 * @description: Local DB connection
 */
const Sequelize = require("sequelize");
const sequelize = new Sequelize("node", "sahilverma", "", {
  dialect: "postgres",
  host: "localhost",
});

module.exports = sequelize;
