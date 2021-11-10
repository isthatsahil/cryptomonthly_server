const models = require("../models/index");
const Portfolio = models.portfolio;

exports.getPortfolio = (req, res) => {
  const user = req.query.user;
  Portfolio.findAll({ where: { user: user } })
    .then((portfolios) => {
      if (null !== portfolios) {
        res.set("Access-Control-Allow-Origin", "*");
        res.json(portfolios);
      }
    })
    .catch((err) => {
      res.json({ error: err });
    });
};
exports.addPortfolio = async (req, res, next) => {
  try {
    const coin = req.body.cryptocurrency;
    const date = req.body.date;
    const quantity = req.body.quantity;
    const pricePerCoin = req.body.pricePerCoin;
    const transactionType = req.body.transactionType;
    const user = req.body.user;

    const portfolio = await Portfolio.create({
      coin: coin,
      date: date,
      quantity: quantity,
      pricePerCoin: pricePerCoin,
      transactionType,
      user: user,
    });

    res.json({
      data: portfolio,
      message: "Portfolio added successfully",
      severity: "success",
    });
  } catch (error) {
    res.json({
      message: "Something went wrong",
      severity: "error",
    });
  }
};

exports.updatePortfolio = (req, res, next) => {
  const pkId = req.body.id;
  const coin = req.body.cryptocurrency;
  const date = req.body.date;
  const quantity = req.body.quantity;
  const costPrice = req.body.buy;
  const sellingPrice = req.body.sell;
  const user = req.body.user;
  Portfolio.update(
    {
      coin: coin,
      date: date,
      quantity: quantity,
      costPrice: costPrice,
      sellingPrice: sellingPrice,
      user: user,
    },
    { where: { id: pkId } }
  )
    .then((result) => {
      res.json({
        message: "Portfolio updated successfully",
        severity: "success",
      });
    })
    .catch((err) => {
      res.json({ error: err });
    });
};

exports.deletePortfolio = (req, res, next) => {
  const pkIdArray = req.body.pkIds;
  Portfolio.destroy({ where: { id: pkIdArray } })
    .then((result) => {
      res.json({
        message: "Portfolio deleted successfully",
        severity: "success",
      });
    })
    .catch((err) => {});
};
