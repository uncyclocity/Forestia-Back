const fs = require("fs");
const keys_dir = "config/secure/";
const key = fs.readFileSync(keys_dir + "privkey.pem");
const cert = fs.readFileSync(keys_dir + "fullchain.pem");

module.exports.options = {
  key,
  cert,
};
