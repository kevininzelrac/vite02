const express = require("express");
const router = express.Router();
const PostsModel = require("./../models/posts");

router.get("/:page", async (req, res) => {
  try {
    const page = await PostsModel.findOne({ label: req.params.page });
    res.send(page);
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
