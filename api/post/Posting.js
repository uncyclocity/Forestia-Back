const connectDB = require("../../middleware/mongodb");
const Free = require("../../models/Free");
const Photo = require("../../models/Photo");
const mongoose = require("mongoose");

const handler = async (req, res) => {
  if (req.method === "POST") {
    const {
      board_type,
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
        var post_obj = {
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
        if (board_type === "free") {
          var post = new Free(post_obj);
        } else if (board_type === "photo") {
          var post = new Photo(post_obj);
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
