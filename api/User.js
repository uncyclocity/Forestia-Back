const connectDB = require("../../middleware/mongodb");
const Member = require("../../models/Member");
const mongoose = require("mongoose");
const { error422, error500 } = require("./errorFunc");

const handler = async (req, res) => {
  let callBack;
  let user;
  let userModified;
  const accessToken =
    req.headers.authorization && req.headers.authorization.substr(7);

  const post = () => {
    const { id, email, nickName } = req.body;
    if (id && email && nickName) {
      let userObj = {
        _id: new mongoose.Types.ObjectId(),
        id,
        email,
        nickname: nickName,
      };

      try {
        user = new Member(userObj);
        userModified = await user.save();
        return res.status(200).send(userModified);
      } catch (err) {
        return error500(res, err.message);
      }
    } else {
      return error422.dataIncomplete(res);
    }
  };

  const del = () => {
    const { id } = req.body;
    if (id) {
      try {
        callBack = async (err, { id: userId }) => {
          if (err) {
            return error422.jwtError(res);
          } else {
            let targetUser = await Member.findOne({ id: userId });
            if (targetUser && id === userId) {
              await Member.deleteOne({ id });
              return res.status(200).send();
            } else {
              return error422.userIsNotFound(res);
            }
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
  } else if (req.method === "DELETE") {
    del();
  } else {
    return error422.reqMethodNotSupported(res);
  }
};

module.exports = connectDB(handler);
