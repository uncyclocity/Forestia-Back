const connectDB = require("../../middleware/mongodb");
const Member = require("../../models/Member");

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const { id } = req.body;
    if (id >= 0) {
      try {
        await Member.deleteOne({ id });
        return res.status(200).send();
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
