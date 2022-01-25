const connectDB = require("../../middleware/mongodb");
const Free = require("../../models/Free");
const Photo = require("../../models/Photo");
const jwt = require("jsonwebtoken");
const Member = require("../../models/Member");

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const { boardType, id, authorId, token } = req.body;
    if (boardType && id >= 0 && authorId && token) {
      try {
        jwt.verify(
          token,
          process.env.JWT_SECRET,
          async (err, { id: userId }) => {
            if (err) {
              res.status(422).send("jwt_error");
              return;
            }
            let author = await Member.findOne({ id: userId });
            if (author && authorId === userId) {
              if (boardType === "free") {
                await Free.deleteOne({ id });
              } else if (boardType === "photo") {
                await Photo.deleteOne({ id });
              }
              return res.status(200).send();
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
