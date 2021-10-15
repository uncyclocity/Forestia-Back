const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/uploads/${req.query.board_type}`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage }).array("images");

fs.readdir("/app/uploads", (error) => {
  if (error) {
    fs.mkdirSync("/app/uploads");
    fs.mkdirSync("/app/uploads/free");
    fs.mkdirSync("/app/uploads/photo");
  }
});

router.post("/", upload, (req, res) => {
  const pathArr = [];
  for (var i = 0; i < req.files.length; i++) {
    pathArr.push(`/uploads/${req.query.board_type}/${req.files[i].filename}`);
  }
  res.json(pathArr);
});

module.exports = router;
