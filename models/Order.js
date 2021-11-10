module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("order", {
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    coinName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Order;
};
