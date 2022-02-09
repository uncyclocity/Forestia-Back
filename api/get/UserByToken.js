const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  console.log(req);
  res.json({ test: "hello world" });

  // jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   res.json(decoded);
  // });
});

module.exports = router;
