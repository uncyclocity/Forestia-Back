const express = require("express");
const server = express();
const https = require("https");
const options = require("./config/pem_config").options;
const domain = require("./config/domain");
const cors = require("cors");
const ports = [80, 443];

server.use(express.json());

server.use(
  cors({
    origin: domain.front,
    credentials: true,
  })
);

const httpsServer = https.createServer(options, server);

/* ------------------------------------------------------------ */

// GET - Posting
const getLatestPostingId = require("./api/get/posting/LatestPostingId");
const getPostingEle = require("./api/get/posting/PostingEle");
const getPostings4List = require("./api/get/posting/Postings4List");
const getPostingsLen = require("./api/get/posting/PostingsLen");
const getPostingsTop3 = require("./api/get/posting/PostingsTop3");

server.use("/posting/latest-posting-id", getLatestPostingId);
server.use("/posting/posting-ele", getPostingEle);
server.use("/posting/postings-4-list", getPostings4List);
server.use("/posting/postings-len", getPostingsLen);
server.use("/posting/postings-top3", getPostingsTop3);

// GET - User
const getUserById = require("./api/get/user/UserById");
const getUserByNickName = require("./api/get/user/UserByNickName");
const getUserByToken = require("./api/get/user/UserByToken");
const getUserToken = require("./api/get/user/UserToken");

server.use("/user/user-by-id", getUserById);
server.use("/user/user-by-nickname", getUserByNickName);
server.use("/user/user-by-token", getUserByToken);
server.use("/user/user-token", getUserToken);

// GET - RefreshToken
const getRefreshTokenIsValid = require("./api/get/refreshToken/RefreshTokenIsValid");
server.use("/refresh-token/refresh-token-is-valid", getRefreshTokenIsValid);

// POST, PUT, DELETE
const image = require("./api/others/Image");
const posting = require("./api/Posting");
const comment = require("./api/others/Comment");
const upDown = require("./api/others/UpDown");
const reply = require("./api/others/Reply");
const user = require("./api/others/User");
const refreshToken = require("./api/others/RefreshToken");

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
    res.redirect(domain.back + req.url);
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
