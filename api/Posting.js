const connectDB = require("../middleware/mongodb");
const Free = require("../models/Free");
const Photo = require("../models/Photo");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Member = require("../models/Member");
const { error422, error500 } = require("./errorFunc");

const handler = async (req, res) => {
  let callBack;
  let posting;
  let postingModified;
  const accessToken =
    req.headers.authorization && req.headers.authorization.substr(7);

  const post = () => {
    const { boardType, id, date, title, content, comments, imagesUrl } =
      req.body;
    if (
      parseInt(id) >= 0 &&
      date &&
      title &&
      content &&
      comments &&
      imagesUrl
    ) {
      const postObj = {
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

      try {
        callBack = async (err, { id: userId }) => {
          if (err) {
            return error422.jwtError(res);
          }
          const author = await Member.findOne({ id: userId });
          if (author) {
            if (boardType === "free") {
              posting = new Free(postObj);
            } else if (boardType === "photo") {
              posting = new Photo(postObj);
            }
            postingModified = await posting.save();
            return res.status(200).send(postingModified);
          } else {
            return error422.userIsNotFound(res);
          }
        };

        jwt.verify(accessToken, process.env.JWT_SECRET, callBack);
      } catch (err) {
        return error500(res, err.message);
      }
    } else {
      return error422.dataIncomplete(res);
    }
  };

  const put = () => {
    const { boardType, id, title, content, authorId } = req.body;
    if (boardType && parseInt(id) >= 0 && title && content && authorId) {
      try {
        callBack = async (err, { id: userId }) => {
          if (err) {
            return error422.jwtError(res);
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
            postingModified = await posting.save();
            return res.status(200).send(postingModified);
          } else {
            return error422.userIsNotFound(res);
          }
        };

        jwt.verify(accessToken, process.env.JWT_SECRET, callBack);
      } catch (err) {
        return error500(res, err.message);
      }
    } else {
      return error422.dataIncomplete(res);
    }
  };

  const del = () => {
    const { boardType, id, authorId } = req.body;
    if (boardType && id >= 0 && authorId) {
      try {
        callBack = async (err, { id: userId }) => {
          if (err) {
            return error422.jwtError(res);
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
            return error422.userIsNotFound(res);
          }
        };

        jwt.verify(accessToken, process.env.JWT_SECRET, callBack);
      } catch (err) {
        return error500(res, err.message);
      }
    } else {
      return error422.dataIncomplete(res);
    }
  };

  if (req.method === "POST") {
    post();
  } else if (req.method === "PUT") {
    put();
  } else if (req.method === "DELETE") {
    del();
  } else {
    return error422.reqMethodNotSupported(res);
  }
};

module.exports = connectDB(handler);
