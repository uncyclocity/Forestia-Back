const connectDB = require("../../middleware/mongodb");
const Member = require("../../models/Member");

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const accessToken = req.headers.authorization.substr(7);
      jwt.verify(accessToken, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          console.error(err);
          return;
        }
        const user = await Member.findOne({ id: decoded.id });
        res.json({ ...decoded, nickname: user.nickname });
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

module.exports = connectDB(handler);
