const express = require('express');
const router = express.Router();

const portfolioController = require('../controllers/portfolioController');

//router.get('/getAllPortfolios',portfolioController.getAllPortfolios);
router.get('/getPortfolio',portfolioController.getPortfolio);
router.post('/addPortfolio',portfolioController.addPortfolio);

module.exports = router;

