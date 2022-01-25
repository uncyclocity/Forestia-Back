const connectDB = require("../../middleware/mongodb");
const Free = require("../../models/Free");
const Photo = require("../../models/Photo");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Member = require("../../models/Member");

const handler = async (req, res) => {
  let postCreated;
  let posting;

  if (req.method === "POST") {
    const { boardType, id, token, date, title, content, comments, imagesUrl } =
      req.body;
    if (
      parseInt(id) >= 0 &&
      token &&
      date &&
      title &&
      content &&
      comments &&
      imagesUrl
    ) {
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
            if (author) {
              let postObj = {
                _id: new mongoose.Types.ObjectId(),
                id,
                author: author.nickname,
                authorId: author.id,
                date,
                title,
                content,
                up: { amount: 0, clicker: [] },
                down: { amount: 0, clicker: [] },
                comments,
                imagesUrl,
              };
              if (boardType === "free") {
                posting = new Free(postObj);
              } else if (boardType === "photo") {
                posting = new Photo(postObj);
              }
              postCreated = await posting.save();
              return res.status(200).send(postCreated);
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
