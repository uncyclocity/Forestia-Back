const connectDB = require("../../middleware/mongodb");
const Member = require("../../models/member");

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { id, token } = req.body;
    if (id && token) {
      try {
        var user = await Member.findOne({ id });
        user.token = token;
        var usercreated = await user.save();
        return res.status(200).send(usercreated);
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
