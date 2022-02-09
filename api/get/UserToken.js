const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtOptions = require("../../config/jwt_options");

router.get("/", (req, res) => {
  const { id, email } = req.query;

  const accessToken = jwt.sign(
    { id, email },
    process.env.JWT_SECRET,
    jwtOptions.accessToken
  );

  res.json(accessToken);
});

module.exports = router;
