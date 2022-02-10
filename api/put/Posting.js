const connectDB = require("../../middleware/mongodb");
const Free = require("../../models/Free");
const Photo = require("../../models/Photo");
const jwt = require("jsonwebtoken");
const Member = require("../../models/Member");

const handler = async (req, res) => {
  let postUpdated;
  let posting;
  const accessToken = req.headers.authorization.substr(7);

  if (req.method === "PUT") {
    const { boardType, id, title, content, authorId } = req.body;
    if (boardType && id >= 0 && title && content && authorId) {
      try {
        jwt.verify(
          accessToken,
          process.env.JWT_SECRET,
          async (err, { id: userId }) => {
            if (err) {
              res.status(422).send("jwt_error");
              return;
            }
            let author = await Member.findOne({ id: userId });
            if (author && userId === authorId) {
              if (boardType === "free") {
                posting = await Free.findOne({ id });
              } else if (boardType === "photo") {
                posting = await Photo.findOne({ id });
              }
              posting.title = title;
              posting.content = content;
              postUpdated = await posting.save();
              return res.status(200).send(postUpdated);
            } else {
              res.status(422).send("user_is_not_found");
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
