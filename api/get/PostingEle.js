const connectDB = require("../../middleware/mongodb");
const Free = require("../../models/Free");
const Photo = require("../../models/Photo");

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { boardtype: boardType, postid: postId } = req.query;
    if ((boardType, postId)) {
      try {
        switch (boardType) {
          case "free":
            var posting = await Free.findOne({ id: postId });
            break;
          case "photo":
            var posting = await Photo.findOne({ id: postId });
            break;
          default:
            console.error(
              "getPostingEle에 넘어오는 쿼리값 boardtype 값을 확인하세요"
            );
            break;
        }
        console.log(postId);
        return res.status(200).send(posting);
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
