const connectDB = require("../../middleware/mongodb");
const Free = require("../../models/Free");
const Photo = require("../../models/Photo");

const handler = async (req, res) => {
  let posting;
  let commentAmount = 0;

  if (req.method === "GET") {
    const { boardtype: boardType, postid: postId } = req.query;
    if ((boardType, postId)) {
      try {
        switch (boardType) {
          case "free":
            posting = await Free.findOne({ id: postId });
            break;
          case "photo":
            posting = await Photo.findOne({ id: postId });
            break;
          default:
            console.error(
              "getPostingEle에 넘어오는 쿼리값 boardtype 값을 확인하세요"
            );
            break;
        }

        commentAmount += posting.comments.length;

        posting.comments.forEach((comment) => {
          commentAmount += comment.replys.length;
        });

        return res.status(200).send(commentAmount);
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
