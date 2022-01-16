const connectDB = require("../../middleware/mongodb");
const Free = require("../../models/Free");
const Photo = require("../../models/Photo");

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { boardtype: boardType } = req.query;
    if (boardType) {
      try {
        switch (boardType) {
          case "free":
            let postings = await Free.find();
            break;
          case "photo":
            let postings = await Photo.find();
            break;
        }
        return res.status(200).send(postings.length.toString());
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
