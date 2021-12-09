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

// import get_users
const getUserById = require("./api/get/UserById");
const getUserByNickName = require("./api/get/UserByNickName");

// import post_users
const postUser = require("./api/post/User");
const postUserToken = require("./api/post/UserToken");

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

// get_users
server.use("/get/user-by-id", getUserById);
server.use("/get/user-by-nickname", getUserByNickName);

// post_users
server.use("/post/user", postUser);
server.use("/post/user-token", postUserToken);

/* ----------------------------------------------------------------------- */

server.use("/uploads", express.static("/app/public/uploads"));

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
