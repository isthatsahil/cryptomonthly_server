const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/portfolioController");


router.get("/getPortfolio", portfolioController.getPortfolio);
router.post("/addPortfolio", portfolioController.addPortfolio);
router.post("/updatePortfolio", portfolioController.updatePortfolio);
module.exports = router;
