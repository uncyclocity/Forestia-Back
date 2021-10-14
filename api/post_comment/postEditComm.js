const connectDB = require("../../middleware/mongodb");
const Free = require("../../models/Free");
const Photo = require("../../models/Photo");

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { board_type, post_id, comment_id, content } = req.body;
    if (comment_id >= 0 && post_id >= 0 && board_type && content) {
      try {
        if (board_type === "free") {
          var post = await Free.findOne({ id: post_id });
        } else if (board_type === "photo") {
          var post = await Photo.findOne({ id: post_id });
        }
        var commentIdx = post.comments.findIndex(
          (comment) => comment.id === comment_id
        );
        post.comments[commentIdx].content = content;
        var commUpdated = await post.save();
        return res.status(200).send(commUpdated);
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
