const express = require("express");
const router = express.Router();

const PostsModel = require("./../models/posts");

router.get("/:post", async (req, res) => {
  try {
    const post = await PostsModel.findOne({
      type: "post",
      label: req.params.post,
    });

    res.send(post);
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
