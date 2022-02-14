const connectDB = require("../middleware/mongodb");
const jwt = require("jsonwebtoken");
const jwtOptions = require("../config/jwt_options");
const Member = require("../models/Member");
const { error422, error500 } = require("./errorFunc");

const handler = async (req, res) => {
  const post = () => {
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
        return res.end();
      } catch (err) {
        return error500(res, err.message);
      }
    } else {
      return error422.dataIncomplete(res);
    }
  };

  if (req.method === "POST") {
    post();
  } else {
    return error422.reqMethodNotSupported(res);
  }
};

module.exports = connectDB(handler);
