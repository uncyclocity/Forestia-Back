const connectDB = require("../../middleware/mongodb");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const Member = require("../../models/Member");

const handler = async (req, res) => {
  if (req.method === "GET") {
    let cookies = {};
    if (req.headers.cookie) {
      cookies = cookie.parse(req.headers.cookie);
      try {
        const refreshToken = cookies.refreshToken;
        jwt.verify(refreshToken, process.env.JWT_SECRET, (err, data) => {
          if (err) {
            return res.status(200);
          }
        });
        const user = await Member.findOne({ refreshToken });
        return res.status(200).send(user);
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      res.status(422).send("cookie_data_is_not_found");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

module.exports = connectDB(handler);
