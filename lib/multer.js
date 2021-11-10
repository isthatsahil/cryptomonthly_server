const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./upload/temp/"); // 'upload/temp' directory name where save the file
  },
  filename: (req, file, callBack) => {
    console.log("file", file);
    callBack(
      null,
      file.originalname.split(".")[0] +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
