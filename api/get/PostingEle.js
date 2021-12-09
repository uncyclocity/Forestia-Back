const connectDB = require("../../middleware/mongodb");
const Free = require("../../models/Free");
const Photo = require("../../models/Photo");

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { board_type, id } = req.query;
    if ((board_type, id)) {
      try {
        switch (board_type) {
          case "free":
            var posting = await Free.findOne({ id });
            break;
          case "photo":
            var posting = await Photo.findOne({ id });
            break;
          default:
            console.error(
              "getPostingEle에 넘어오는 쿼리값 board_type 값을 확인하세요"
            );
            break;
        }
        console.log(posting);
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
