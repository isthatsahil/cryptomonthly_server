const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/server");

const models = {};
models.user = require("./Users")(sequelize, DataTypes);
models.portfolio = require("./Portfolio")(sequelize, DataTypes);
models.order = require("./Order")(sequelize, DataTypes);

models.user.hasMany(models.order);
models.order.belongsTo(models.user);
module.exports = models;
