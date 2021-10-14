const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/', (req, res) => {
  const { imagesUrl } = req.body;
  for (var i = 0; i < imagesUrl.length; i++) {
    fs.unlink(`public${imagesUrl[i]}`, (error) => {
      if (error) {
        return res.status(500).send(error.message);
      }
      return res.status(200).send();
    });
  }
});

module.exports = router;
