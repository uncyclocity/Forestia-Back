const connectDB = require("../../middleware/mongodb");
const Free = require("../../models/Free");
const Photo = require("../../models/Photo");

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { board_type, id } = req.body;
    if (board_type && id >= 0) {
      try {
        if (board_type === "free") {
          await Free.deleteOne({ id });
        } else if (board_type === "photo") {
          await Photo.deleteOne({ id });
        }
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
