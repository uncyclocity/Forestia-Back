const connectDB = require("../../middleware/mongodb");
const Free = require("../../models/Free");
const Photo = require("../../models/Photo");
const jwt = require("jsonwebtoken");
const Member = require("../../models/Member");
const { error422, error500 } = require("../errorFunc");

const addition = (post, userId, udType) => {
  post[udType].amount = parseInt(post[udType].amount) + 1;
  post[udType].clicker.push(userId);
};

const substract = (post, userId, udType) => {
  post[udType].amount = parseInt(post[udType].amount) - 1;
  post[udType].clicker = post[udType].clicker.filter(
    (clickUser) => clickUser !== userId
  );
};

const handler = async (req, res) => {
  let callBack;
  let posting;
  let postingModified;
  const accessToken = req.headers.authorization.substr(7);

  const put = () => {
    const { boardType, postId, udType, operation, revUdType } = req.body;
    if (boardType && parseInt(postId) >= 0 && udType && operation) {
      try {
        callBack = async (err, { id: userId }) => {
          if (err) {
            return error422.jwtError(res);
          }
          const author = await Member.findOne({ id: userId });
          if (author) {
            if (boardType === "free") {
              posting = await Free.findOne({ id: postId });
            } else if (boardType === "photo") {
              posting = await Photo.findOne({ id: postId });
            }
            if (operation === "add") {
              addition(posting, userId, udType);
            } else if (operation === "sub") {
              substract(posting, userId, udType);
            } else if (operation === "addsub") {
              substract(posting, userId, revUdType);
              addition(posting, userId, udType);
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

  if (req.method === "PUT") {
    put();
  } else {
    return error422.reqMethodNotSupported(res);
  }
};

module.exports = connectDB(handler);
