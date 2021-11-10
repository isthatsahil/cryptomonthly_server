module.exports = (sequelize, DataTypes) => {
  const Portfolio = sequelize.define("portfolio", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    coin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    // costPrice : {
    //     type : DataTypes.DECIMAL,
    //     allowNull : false,
    // },
    // sellingPrice : {
    //     type : DataTypes.DECIMAL,
    //     allowNull : true,
    // },
    pricePerCoin: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    transactionType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Portfolio;
};
