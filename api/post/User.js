const connectDB = require("../../middleware/mongodb");
const Member = require("../../models/Member");
const mongoose = require("mongoose");

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { id, email, nickName, token } = req.body;
    if (id && email && nickName) {
      try {
        let user_obj = {
          _id: new mongoose.Types.ObjectId(),
          id,
          email,
          nickname: nickName,
          token,
        };
        let user = new Member(user_obj);
        let usercreated = await user.save();
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
