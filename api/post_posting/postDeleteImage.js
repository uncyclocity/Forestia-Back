const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");
const s3 = new aws.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
});

router.post("/", (req, res) => {
  const { imagesUrl } = req.body;
  for (var i = 0; i < imagesUrl.length; i++) {
    s3.deleteObject(
      {
        Bucket: "forestiaishere", // 사용자 버켓 이름
        Key: imagesUrl[i], // 버켓 내 경로
      },
      (err, data) => {
        if (err) {
          throw err;
        }
        console.log("s3 deleteObject ", data);
      }
    );
  }
});

module.exports = router;
