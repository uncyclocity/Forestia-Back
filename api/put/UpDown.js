const connectDB = require("../../middleware/mongodb");
const Free = require("../../models/Free");
const Photo = require("../../models/Photo");
const jwt = require("jsonwebtoken");
const Member = require("../../models/Member");

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
  let updownUpdated;
  let updown;
  const accessToken = req.headers.authorization.substr(7);

  if (req.method === "PUT") {
    const { boardType, postId, udType, operation, revUdType } = req.body;
    if (boardType && parseInt(postId) >= 0 && udType && operation) {
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
            if (author) {
              if (boardType === "free") {
                updown = await Free.findOne({ id: postId });
              } else if (boardType === "photo") {
                updown = await Photo.findOne({ id: postId });
              }
              if (operation === "add") {
                addition(updown, userId, udType);
              } else if (operation === "sub") {
                substract(updown, userId, udType);
              } else if (operation === "addsub") {
                substract(updown, userId, revUdType);
                addition(updown, userId, udType);
              }
              updownUpdated = await updown.save();
              return res.status(200).send(updownUpdated);
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
