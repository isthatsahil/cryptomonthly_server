const Portfolio = require("../models/Portfolio");

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
    const costPrice = req.body.buy;
    const sellingPrice = req.body.sell;
    const user = req.body.user;
    const isPortfolioExists = await Portfolio.findOne({
      where: { coin: coin, user: user },
    });
    if (isPortfolioExists == null) {
      Portfolio.create({
        coin: coin,
        date: date,
        quantity: quantity,
        costPrice: costPrice,
        sellingPrice: sellingPrice,
        user: user,
      });

      res.json({
        message: "Portfolio added successfully",
        severity: "success",
      });
    } else {
      res.set("Access-Control-Allow-Origin", "*");
      res.json({ message: "Portfolio already exists", severity: "warning" });
    }
  } catch (error) {}
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
