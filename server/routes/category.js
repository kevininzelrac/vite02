const express = require("express");
const router = express.Router();
const PostsModel = require("./../models/posts");

router.get("/:category", async (req, res) => {
  try {
    const category = await PostsModel.find({
      //type: "post",
      category: req.params.category,
    }).sort({ date: -1 });

    res.send(category);
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
