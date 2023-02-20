const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.connect(process.env.HOST);
mongoose.set("strictQuery", false);

const CommentsModel = require("../models/comments");
const { privateRoute } = require("../middlewares/privateRoute");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.post("/api/addcomment", privateRoute, async (req, res) => {
  try {
    await new CommentsModel({
      author: req.user.name,
      user: req.user._id,
      parent_id: req.body._id,
      date: new Date(),
      content: req.body.content,
    }).save();
    res.json(new Date());
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;
