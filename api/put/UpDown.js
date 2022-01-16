const connectDB = require("../../middleware/mongodb");
const Free = require("../../models/Free");
const Photo = require("../../models/Photo");

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
  if (req.method === "PUT") {
    const { boardType, postId, udType, operation, userId, revUdType } =
      req.body;
    if (boardType && parseInt(postId) >= 0 && udType && operation && userId) {
      try {
        if (boardType === "free") {
          let post = await Free.findOne({ id: postId });
        } else if (boardType === "photo") {
          let post = await Photo.findOne({ id: postId });
        }
        if (operation === "add") {
          addition(post, userId, udType);
        } else if (operation === "sub") {
          substract(post, userId, udType);
        } else if (operation === "addsub") {
          substract(post, userId, revUdType);
          addition(post, userId, udType);
        }
        let postupdated = await post.save();
        return res.status(200).send(postupdated);
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
