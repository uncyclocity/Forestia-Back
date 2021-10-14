const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const member = new Schema({
  _id: Schema.Types.ObjectId,

  id: String,

  email: String,

  nickname: String,

  token: String,
});

module.exports = mongoose.models.Member || mongoose.model('Member', member);
