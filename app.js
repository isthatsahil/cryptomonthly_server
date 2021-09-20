const express = require("express");
require('dotenv').config();
const sequelize = require("./db/server");
const cors = require("cors");
const bodyParser = require("body-parser");
const LOGGER = require("morgan");
const portfolioRoutes = require("./routes/portfolioRoutes");
const app = express();
app.use(LOGGER("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(portfolioRoutes);

sequelize
  .sync()
  .then((result) => {
    app.listen(process.env.PORT || 5000, () => console.log("Server running on ::" + process.env.PORT || 5000));
  })
  .catch((err) => {
    console.log("Error while syncing", err);
  });
