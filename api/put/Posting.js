const connectDB = require("../../middleware/mongodb");
const Free = require("../../models/Free");
const Photo = require("../../models/Photo");

const handler = async (req, res) => {
  if (req.method === "PUT") {
    const { board_type, id, title, content } = req.body;
    if (board_type && id >= 0 && title && content) {
      try {
        if (board_type === "free") {
          var post = await Free.findOne({ id });
        } else if (board_type === "photo") {
          var post = await Photo.findOne({ id });
        }
        post.title = title;
        post.content = content;
        var postupdated = await post.save();
        return res.status(200).send(postupdated);
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
