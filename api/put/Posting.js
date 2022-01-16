const connectDB = require("../../middleware/mongodb");
const Free = require("../../models/Free");
const Photo = require("../../models/Photo");

const handler = async (req, res) => {
  if (req.method === "PUT") {
    const { boardType, id, title, content } = req.body;
    if (boardType && id >= 0 && title && content) {
      try {
        if (boardType === "free") {
          let post = await Free.findOne({ id });
        } else if (boardType === "photo") {
          let post = await Photo.findOne({ id });
        }
        post.title = title;
        post.content = content;
        let postupdated = await post.save();
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
