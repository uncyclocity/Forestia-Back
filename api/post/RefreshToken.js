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
        res.writeHead(200, {
          "Set-Cookie": [
            `refreshToken=${refreshToken}`,
            "Secure=Secure; Secure",
            "HttpOnly=HttpOnly; HttpOnly",
          ],
        });
        const user = await Member.findOne({ id });
        uset.refreshToken = refreshToken;
        const userUpdated = await user.save();
        return res.status(200).send(userUpdated);
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
