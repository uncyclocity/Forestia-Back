const express = require("express");
const server = express();
const https = require("https");
const options = require("./config/pem_config").options;
const cors = require("cors");
const ports = [80, 443];

server.use(express.json());

server.use(cors());

const httpsServer = https.createServer(options, server);

// import get_posting
const getLatestPostingId = require("./api/get/LatestPostingId");
const getPostingEle = require("./api/get/PostingEle");
const getPostings4List = require("./api/get/Postings4List");
const getPostingsLen = require("./api/get/PostingsLen");
const getPostingsTop3 = require("./api/get/PostingsTop3");

// import post_posting
const postImage = require("./api/post/Image");
const postPosting = require("./api/post/Posting");

// import delete_posting
const deleteImage = require("./api/delete/Image");
const deletePosting = require("./api/delete/Posting");

// import put_posting
const putPosting = require("./api/put/Posting");
const putUpDown = require("./api/put/UpDown");

// import post_comment
const postComment = require("./api/post/Comment");

// import delete_comment
const deleteComment = require("./api/delete/Comment");

// import put_comment
const putComment = require("./api/put/Comment");

// import post_reply
const postReply = require("./api/post/Reply");

// import delete_reply
const deleteReply = require("./api/delete/Reply");

// import put_reply
const putReply = require("./api/put/Reply");

// import get_users
const getUserById = require("./api/get/UserById");
const getUserByNickName = require("./api/get/UserByNickName");
const getUserByToken = require("./api/get/UserByToken");
const getUserToken = require("./api/get/UserToken");

// import post_users
const postUser = require("./api/post/User");

// import delete_users
const deleteUser = require("./api/delete/User");

// import get_refresh_token
const getRefreshTokenIsValid = require("./api/get/RefreshTokenIsValid");

// import post_refresh_token
const postRefreshToken = require("./api/post/RefreshToken");

/* ----------------------------------------------------------------------- */

// get_posting
server.use("/get/latest-posting-id", getLatestPostingId);
server.use("/get/posting-ele", getPostingEle);
server.use("/get/postings-4-list", getPostings4List);
server.use("/get/postings-len", getPostingsLen);
server.use("/get/postings-top3", getPostingsTop3);

// post_posting
server.use("/post/image", postImage);

server.use("/post/posting", postPosting);

// delete_posting
server.use("/delete/image", deleteImage);
server.use("/delete/posting", deletePosting);

// delete_edit
server.use("/put/posting", putPosting);
server.use("/put/updown", putUpDown);

// post_comment
server.use("/post/comment", postComment);

// delete_comment
server.use("/delete/comment", deleteComment);

// edit_comment
server.use("/put/comment", putComment);

// post_reply
server.use("/post/reply", postReply);

// delete_reply
server.use("/delete/reply", deleteReply);

// edit_reply
server.use("/put/reply", putReply);

// get_users
server.use("/get/user-by-id", getUserById);
server.use("/get/user-by-nickname", getUserByNickName);
server.use("/get/user-by-token", getUserByToken);
server.use("/get/user-token", getUserToken);

// post_users
server.use("/post/user", postUser);

// delete_users
server.use("/delete/user", deleteUser);

// get_refresh_token
server.use("/get/refresh-token-is-valid", getRefreshTokenIsValid);

// post_refresh_token
server.use("/get/refresh_token", postRefreshToken);

/* ----------------------------------------------------------------------- */

server.use("/uploads", express.static("/app/public/uploads"));

server.use((req, res, next) => {
  if (!req.secure) {
    res.redirect("https://api.forestia.me" + req.url);
  } else {
    next();
  }
});

server.get("/", (req, res) => {
  res.send("Forestia is here");
});

server.listen(ports[0], (err) => {
  if (err) throw err;
  console.log(ports[0] + "번 포트에서 대기 중");
});

httpsServer.listen(ports[1], (err) => {
  if (err) throw err;
  console.log(ports[1] + "번 포트에서 대기 중");
});
