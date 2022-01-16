const connectDB = require("../../middleware/mongodb");
const Free = require("../../models/Free");
const Photo = require("../../models/Photo");

const handler = async (req, res) => {
  if (req.method === "PUT") {
    const { boardType, postId, commentId, content } = req.body;
    if (commentId >= 0 && postId >= 0 && boardType && content) {
      try {
        if (boardType === "free") {
          let post = await Free.findOne({ id: postId });
        } else if (boardType === "photo") {
          let post = await Photo.findOne({ id: postId });
        }
        let commentIdx = post.comments.findIndex(
          (comment) => comment.id === commentId
        );
        post.comments[commentIdx].content = content;
        let commUpdated = await post.save();
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
