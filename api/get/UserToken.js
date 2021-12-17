const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  const { id, email } = req.query;

  const token = jwt.sign(
    {
      id,
      email,
    },
    process.env.JWT_SECRET
  );

  res.json(token);
});

module.exports = router;
