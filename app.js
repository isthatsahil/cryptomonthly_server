const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const LOGGER = require("morgan");

/**
 * @description: Routes for different path
 */
const portfolioRoutes = require("./routes/portfolioRoutes");
const platformRoutes = require("./routes/platformRoutes");
const userRoutes = require("./routes/userRoute");
/**
 * @description: DB connection and utitlity
 */
const sequelize = require("./db/server");
const { cloudinary } = require("./lib/cloudinary");
const Images = require("./models/Images");

/**
 * @description: Initialize express app
 */
const app = express();
require("dotenv").config();
app.use(LOGGER("dev"));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use(userRoutes);
app.use(platformRoutes);
app.use(portfolioRoutes);

/**
 * @description: Upload image to cloudinary logic below
 *
 */
app.get("/api/images", async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("folder:certificates")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});

app.post("/image/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "certificates",
      use_filename: true,
    });
    res.json({ msg: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: err });
  }
});

app.use("/image/getAllImages", (req, res) => {
  Images.findAll()
    .then((image) => {
      console.log("image", image);
      if (null !== image) {
        res.set("Access-Control-Allow-Origin", "*");
        res.json(image);
      }
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

app.get("/upload/images/:imageId", (req, res) => {
  const filename = req.params.imageId;
  res.sendFile(path.join(__dirname, `upload/images/${filename}`));
});

/**
 * @description: Launcher for app.js
 */
sequelize
  .sync()
  .then((result) => {
    app.listen(5001, () => console.log("Server running on ::", 5001));
  })
  .catch((err) => {
    console.log("Error while syncing", err);
  });
