const connectDB = require("../../middleware/mongodb");
const jwt = require("jsonwebtoken");
const jwtOptions = require("../../config/jwt_options");
const Member = require("../../models/Member");

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { id } = req.body;
    if (id) {
      try {
        const refreshToken = jwt.sign(
          {},
          process.env.JWT_SECRET,
          jwtOptions.refreshToken
        );
        const user = await Member.findOne({ id });
        user.refreshToken = refreshToken;
        await user.save();
        res.writeHead(200, {
          "Set-Cookie": `refreshToken=${refreshToken}; domain=.forestia.me; path=/`,
        });
        res.end();
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      res.status(422).send("data_incomplete");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

module.exports = connectDB(handler);
