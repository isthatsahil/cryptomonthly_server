const express = require("express");
require("dotenv").config();
const path = require("path");
const multer = require("multer");
const sequelize = require("./db/server");
const cors = require("cors");
const bodyParser = require("body-parser");
const LOGGER = require("morgan");
const portfolioRoutes = require("./routes/portfolioRoutes");
const imageUploader = require("./routes/imageUploaderRoutes");

const Images = require("./models/Images");

const app = express();

app.use(LOGGER("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//! Use of Multer
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./upload/images/"); // 'upload/images' directory name where save the file
  },
  filename: (req, file, callBack) => {
    console.log("file", file);
    callBack(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.use("/image/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    console.log("No file upload");
  } else {
    const imgUrl =
      "https://cryptomonthly-server.herokuapp.com/upload/images/" +
      req.file.filename;
    const imageName = req.file.filename;
    Images.create({
      imageName: imageName,
      imageUrl: imgUrl,
    });
    res.json({
      msg: "Success",
    });
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

app.use(portfolioRoutes);
sequelize
  .sync()
  .then((result) => {
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server running on ::" + process.env.PORT || 5000)
    );
  })
  .catch((err) => {
    console.log("Error while syncing", err);
  });
