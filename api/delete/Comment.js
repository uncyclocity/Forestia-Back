const connectDB = require("../../middleware/mongodb");
const Free = require("../../models/Free");
const Photo = require("../../models/Photo");
const jwt = require("jsonwebtoken");
const Member = require("../../models/Member");

const handler = async (req, res) => {
  let commUpdated;
  let posting;
  const accessToken = req.headers.authorization.substr(7);

  if (req.method === "DELETE") {
    const { boardType, postId, commentId, authorId } = req.body;
    if (
      parseInt(commentId) >= 0 &&
      parseInt(postId) >= 0 &&
      boardType &&
      authorId
    ) {
      try {
        jwt.verify(
          accessToken,
          process.env.JWT_SECRET,
          async (err, { id: userId }) => {
            if (err) {
              res.status(422).send("jwt_error");
              return;
            } else {
              let author = await Member.findOne({ id: userId });
              if (author && userId === authorId) {
                if (boardType === "free") {
                  posting = await Free.findOne({ id: postId });
                } else if (boardType === "photo") {
                  posting = await Photo.findOne({ id: postId });
                }
                posting.comments = posting.comments.filter(
                  (comment) => comment.id !== commentId
                );
                commUpdated = await posting.save();
                return res.status(200).send(commUpdated);
              } else {
                res.status(422).send("user_is_not_found");
              }
            }
          }
        );
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
