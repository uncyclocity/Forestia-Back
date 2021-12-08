const express = require("express");
const server = express();
const https = require("https");
const fs = require("fs");
const options = require("./config/pem_config").options;
const cors = require("cors");
const ports = [80, 443];

server.use(express.json());

server.use(cors());

const httpsServer = https.createServer(options, server);

// import get_posting
const getLatestPostingId = require("./api/get_posting/getLatestPostingId");
const getPostingEle = require("./api/get_posting/getPostingEle");
const getPostingsForList = require("./api/get_posting/getPostingsForList");
const getPostingsLen = require("./api/get_posting/getPostingsLen");
const getPostingsTop3 = require("./api/get_posting/getPostingsTop3");

// import post_posting
const postCreateImage = require("./api/post_posting/postCreateImage");
const postCreatePosting = require("./api/post_posting/postCreatePosting");

// import delete_posting
const postDeleteImage = require("./api/post_posting/postDeleteImage");
const postDeletePosting = require("./api/post_posting/postDeletePosting");

// import put_posting
const postEditPosting = require("./api/post_posting/postEditPosting");
const postEditUpDown = require("./api/post_posting/postEditUpDown");

// import post_comment
const postCreateComm = require("./api/post_comment/postCreateComm");

// import delete_comment
const postDeleteComm = require("./api/post_comment/postDeleteComm");

// import put_comment
const postEditComm = require("./api/post_comment/postEditComm");

// import get_users
const getUserById = require("./api/get_users/getUserById");
const getUserByNickName = require("./api/get_users/getUserByNickName");

// import post_users
const postUser = require("./api/post_users/postUser");
const postUserToken = require("./api/post_users/postUserToken");

/* ----------------------------------------------------------------------- */

// get_posting
server.use("/api/get_posting/getLatestPostingId", getLatestPostingId);
server.use("/api/get_posting/getPostingEle", getPostingEle);
server.use("/api/get_posting/getPostingsForList", getPostingsForList);
server.use("/api/get_posting/getPostingsLen", getPostingsLen);
server.use("/api/get_posting/getPostingsTop3", getPostingsTop3);

// post_posting
server.use("/api/post_posting/postCreateImage", postCreateImage);

server.use("/api/post_posting/postCreatePosting", postCreatePosting);

// delete_posting
server.use("/api/post_posting/postDeleteImage", postDeleteImage);
server.use("/api/post_posting/postDeletePosting", postDeletePosting);

// delete_edit
server.use("/api/post_posting/postEditPosting", postEditPosting);
server.use("/api/post_posting/postEditUpDown", postEditUpDown);

// post_comment
server.use("/api/post_comment/postCreateComm", postCreateComm);

// delete_comment
server.use("/api/post_comment/postDeleteComm", postDeleteComm);

// edit_comment
server.use("/api/post_comment/postEditComm", postEditComm);

// get_users
server.use("/api/get_users/getUserById", getUserById);
server.use("/api/get_users/getUserByNickName", getUserByNickName);

// post_users
server.use("/api/post_users/postUser", postUser);
server.use("/api/post_users/postUserToken", postUserToken);

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
