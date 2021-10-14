const connectDB = require("../../middleware/mongodb");
const Free = require("../../models/Free");
const Photo = require("../../models/Photo");

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { board_type, post_id, comment_id, author, authorId, date, content } =
      req.body;
    if (
      (board_type,
      post_id,
      comment_id >= 0 && author && authorId && date && content)
    ) {
      try {
        var newComment = {
          id: comment_id,
          author,
          authorId,
          date,
          content,
        };
        if (board_type === "free") {
          var post = await Free.findOne({ id: post_id });
        } else if (board_type === "photo") {
          var post = await Photo.findOne({ id: post_id });
        }
        post.comments.push(newComment);
        var postUpdated = await post.save();
        return res.status(200).send(postUpdated);
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
