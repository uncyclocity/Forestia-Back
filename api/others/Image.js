const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const { error500 } = require("../errorFunc");
const s3 = new aws.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
});

const storage = multerS3({
  s3: s3,
  bucket: "itsforestia",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: "public-read",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
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
  for (let i = 0; i < req.files.length; i++) {
    pathArr.push(req.files[i].key);
  }
  res.json(pathArr);
});

router.delete("/", (req, res) => {
  const { imagesUrl } = req.body;
  for (let i = 0; i < imagesUrl.length; i++) {
    s3.deleteObject(
      {
        Bucket: "itsforestia", // 사용자 버켓 이름
        Key: imagesUrl[i], // 버켓 내 경로
      },
      (err, data) => {
        if (err) {
          return error500(res, err.message);
        }
      }
    );
  }
  return res.status(200).send();
});

module.exports = router;
