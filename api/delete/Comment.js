const connectDB = require("../../middleware/mongodb");
const Free = require("../../models/Free");
const Photo = require("../../models/Photo");

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const { boardType, postId, commentId } = req.body;
    if (parseInt(commentId) >= 0 && parseInt(postId) >= 0 && boardType) {
      try {
        if (boardType === "free") {
          var post = await Free.findOne({ id: postId });
        } else if (boardType === "photo") {
          var post = await Photo.findOne({ id: postId });
        }
        post.comments = post.comments.filter(
          (comment) => comment.id !== commentId
        );
        var postUpdated = await post.save();
        return res.status(200).send(postUpdated);
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else if (!commentId) {
      return res.end();
    } else {
      res.status(422).send("data_incomplete");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

module.exports = connectDB(handler);
