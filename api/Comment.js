const connectDB = require("../middleware/mongodb");
const Free = require("../models/Free");
const Photo = require("../models/Photo");
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
    const { boardType, postId, commentId, date, content } = req.body;
    if (
      boardType &&
      parseInt(postId) >= 0 &&
      parseInt(commentId) >= 0 &&
      date &&
      content
    ) {
      try {
        callBack = (err, { id: userId }) => {
          if (err) {
            return error422.jwtError(res);
          }
          let author = await Member.findOne({ id: userId });
          if (author) {
            let commObj = {
              id: commentId,
              author: author.nickname,
              authorId: author.id,
              date,
              content,
            };
            if (boardType === "free") {
              posting = await Free.findOne({ id: postId });
            } else if (boardType === "photo") {
              posting = await Photo.findOne({ id: postId });
            }
            posting.comments.push(commObj);
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
    const { boardType, postId, commentId, content, authorId } = req.body;
    if (
      parseInt(commentId) >= 0 &&
      parseInt(postId) >= 0 &&
      boardType &&
      content &&
      authorId
    ) {
      try {
        callBack = async (err, { id: userId }) => {
          if (err) {
            return error422.jwtError(res);
          }
          let author = await Member.findOne({ id: userId });
          if (author && userId === authorId) {
            if (boardType === "free") {
              posting = await Free.findOne({ id: postId });
            } else if (boardType === "photo") {
              posting = await Photo.findOne({ id: postId });
            }
            let commentIdx = posting.comments.findIndex(
              (comment) => comment.id === commentId
            );
            posting.comments[commentIdx].content = content;
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
    const { boardType, postId, commentId, authorId } = req.body;
    if (
      parseInt(commentId) >= 0 &&
      parseInt(postId) >= 0 &&
      boardType &&
      authorId
    ) {
      try {
        callBack = async (err, { id: userId }) => {
          if (err) {
            return error422.jwtError(res);
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
              postingModified = await posting.save();
              return res.status(200).send(postingModified);
            } else {
              return error422.userIsNotFound(res);
            }
          }
        };

        jwt.verify(accessToken, process.env.JWT_SECRET, callBack);
      } catch (err) {
        return error500.apply(res, err.message);
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
