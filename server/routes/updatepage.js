const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.connect(process.env.HOST);
mongoose.set("strictQuery", false);
const PostsModel = require("../models/posts");
//const { verifyToken } = require("../middlewares/verifyToken");
const { privateRoute } = require("../middlewares/privateRoute");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.post("/api/updatepage", privateRoute, async (req, res) => {
  try {
    const post = await PostsModel.findOne({
      author: await req.user.name,
      label: await req.body.label,
    });
    post.about = await req.body.about;
    post.updated = new Date();
    await post.save();
    res.send(new Date());
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
