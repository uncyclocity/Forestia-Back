const express = require("express");
const server = express();
const https = require("https");
const options = require("./config/pem_config").options;
const cors = require("cors");
const ports = [80, 443];

server.use(express.json());

server.use(
  cors({
    origin: process.env.FRONT_URL,
    credentials: true,
  })
);

const httpsServer = https.createServer(options, server);

/* ------------------------------------------------------------ */

// GET - Posting
const getLatestPostingId = require("./api/get/LatestPostingId");
const getPostingEle = require("./api/get/PostingEle");
const getPostings4List = require("./api/get/Postings4List");
const getPostingsLen = require("./api/get/PostingsLen");
const getPostingsTop3 = require("./api/get/PostingsTop3");

server.use("/get/latest-posting-id", getLatestPostingId);
server.use("/get/posting-ele", getPostingEle);
server.use("/get/postings-4-list", getPostings4List);
server.use("/get/postings-len", getPostingsLen);
server.use("/get/postings-top3", getPostingsTop3);

// GET - User
const getUserById = require("./api/get/UserById");
const getUserByNickName = require("./api/get/UserByNickName");
const getUserByToken = require("./api/get/UserByToken");
const getUserToken = require("./api/get/UserToken");

server.use("/get/user-by-id", getUserById);
server.use("/get/user-by-nickname", getUserByNickName);
server.use("/get/user-by-token", getUserByToken);
server.use("/get/user-token", getUserToken);

// GET - RefreshToken
const getRefreshTokenIsValid = require("./api/get/RefreshTokenIsValid");
server.use("/get/refresh-token-is-valid", getRefreshTokenIsValid);

// POST, PUT, DELETE
const image = require("./api/Image");
const posting = require("./api/Posting");
const comment = require("./api/Comment");
const upDown = require("./api/UpDown");
const reply = require("./api/Reply");
const user = require("./api/User");
const refreshToken = require("./api/RefreshToken");

server.use("/image", image);
server.use("/posting", posting);
server.use("/comment", comment);
server.use("/up-down", upDown);
server.use("/reply", reply);
server.use("/user", user);
server.use("/refresh-token", refreshToken);

/* ------------------------------------------------------------ */

server.use("/uploads", express.static("/app/public/uploads"));

server.use((req, res, next) => {
  if (!req.secure) {
    res.redirect(process.env.BACK_URL + req.url);
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
