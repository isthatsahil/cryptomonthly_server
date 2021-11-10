const express = require("express");
const router = express.Router();
const upload = require("../lib/multer");
const platformController = require("../controllers/platformController");

router.post(
  "/platform/file-upload",
  upload.single("file"),
  platformController.saveFileToDB
);
module.exports = router;
