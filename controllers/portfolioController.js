const Portfolio = require("../models/Portfolio");

exports.getPortfolio = async (req, res) => {
  try {
    const user = req.query.user;
    const portfolios = await Portfolio.findAll({ where: { user: user } });
    res.set("Access-Control-Allow-Origin", "*");
    res.json(portfolios);
  } catch (error) {}
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

      res.json({ message: "Portfolio added successfully", code: "green" });
    } else {
      res.set("Access-Control-Allow-Origin", "*");
      res.json({ message: "Portfolio already exists", code: "yellow" });
    }
  } catch (error) {}
};

exports.updatePortfolio = async (req, res, next) => {
  try {
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
    );
    res.json({ message: "Portfolio updated successfully", code: "green" });
  } catch (error) {
    res.json({error: error});
  }
};