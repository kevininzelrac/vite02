const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.connect(process.env.HOST);
mongoose.set("strictQuery", false);
const PostsModel = require("../models/posts");
const { verifyToken } = require("../middlewares/verifyToken");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.post("/api/updatepage", verifyToken, async (req, res) => {
  try {
    const post = await PostsModel.findOne({
      author: req.user.name,
      label: req.body.label,
    });
    post.about = req.body.about;
    post.updated = new Date();
    post.save();
    res.json(new Date());
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;
