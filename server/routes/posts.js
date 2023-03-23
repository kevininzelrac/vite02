const express = require("express");
const router = express.Router();
const PostsModel = require("./../models/posts");

router.get("/", async (req, res) => {
  try {
    const posts = await PostsModel.find({ type: "post" })
      .sort({ date: -1 })
      .populate({
        path: "author",
        select: "_id avatar name",
      });

    res.send(posts);
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
