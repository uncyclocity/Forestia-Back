const connectDB = require("../../middleware/mongodb");
const Free = require("../../models/Free");
const Photo = require("../../models/Photo");

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { boardType, postId, commentId, author, authorId, date, content } =
      req.body;
    if (
      (boardType,
      postId,
      commentId >= 0 && author && authorId && date && content)
    ) {
      try {
        let newComment = {
          id: commentId,
          author,
          authorId,
          date,
          content,
        };
        if (boardType === "free") {
          let post = await Free.findOne({ id: postId });
        } else if (boardType === "photo") {
          let post = await Photo.findOne({ id: postId });
        }
        post.comments.push(newComment);
        let postUpdated = await post.save();
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
