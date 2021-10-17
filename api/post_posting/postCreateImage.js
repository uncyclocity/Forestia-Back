const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const s3 = new aws.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
});

const storage = multerS3({
  s3: s3,
  bucket: "forestiaishere",
  acl: "public-read",
  key: function (req, file, cb) {
    cb(
      null,
      Math.floor(Math.random() * 1000).toString() +
        Date.now() +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({ storage }).array("images");

router.post("/", upload, (req, res) => {
  const pathArr = [];
  for (var i = 0; i < req.files.length; i++) {
    pathArr.push(req.files[i].location);
  }
  res.json(pathArr);
});

module.exports = router;
