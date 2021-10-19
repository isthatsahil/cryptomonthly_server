const express = require("express");
const router = express.Router();

router.post("/upload", (req, res) => {
  console.log("req for image", req);
  res.json({
    success: "true",
  });
});

module.exports = router;
