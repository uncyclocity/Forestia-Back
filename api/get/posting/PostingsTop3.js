const connectDB = require("../../../middleware/mongodb");
const Free = require("../../../models/Free");
const Photo = require("../../../models/Photo");

const handler = async (req, res) => {
  let postings;

  if (req.method === "GET") {
    const { boardtype: boardType } = req.query;
    if (boardType) {
      try {
        switch (boardType) {
          case "free":
            postings = await Free.find().sort({ _id: -1 }).limit(3);
            break;
          case "photo":
            postings = await Photo.find().sort({ _id: -1 }).limit(3);
            break;
        }
        return res.status(200).send(postings);
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
