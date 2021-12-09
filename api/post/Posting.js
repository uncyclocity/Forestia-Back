const connectDB = require("../../middleware/mongodb");
const Free = require("../../models/Free");
const Photo = require("../../models/Photo");
const mongoose = require("mongoose");

const handler = async (req, res) => {
  if (req.method === "POST") {
    const {
      boardType,
      id,
      author,
      authorId,
      date,
      title,
      content,
      comments,
      imagesUrl,
    } = req.body;
    if (
      id >= 0 &&
      author &&
      authorId &&
      date &&
      title &&
      content &&
      comments &&
      imagesUrl
    ) {
      try {
        var postObj = {
          _id: new mongoose.Types.ObjectId(),
          id,
          author,
          authorId,
          date,
          title,
          content,
          up: { amount: 0, clicker: [] },
          down: { amount: 0, clicker: [] },
          comments,
          imagesUrl,
        };
        if (boardType === "free") {
          var post = new Free(postObj);
        } else if (boardType === "photo") {
          var post = new Photo(postObj);
        }
        var postcreated = await post.save();
        return res.status(200).send(postcreated);
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
