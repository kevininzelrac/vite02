const express = require("express");
const router = express.Router();

const CommentsModel = require("../models/comments");
const { privateRoute } = require("../middlewares/privateRoute");

router.post("/", privateRoute, async (req, res) => {
  try {
    await new CommentsModel({
      author: await req.user._id,
      parent_id: await req.body._id,
      date: new Date(),
      content: await req.body.content,
    }).save();
    res.send(new Date());
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
