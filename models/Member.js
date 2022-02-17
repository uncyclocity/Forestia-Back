const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const member = new Schema({
  _id: Schema.Types.ObjectId,

  id: String,

  email: String,

  nickname: String,

  refreshToken: String,

  imageUrl: String,
});

module.exports = mongoose.models.Member || mongoose.model("Member", member);
