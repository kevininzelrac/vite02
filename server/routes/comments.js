const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.connect(process.env.HOST);
mongoose.set("strictQuery", false);
const PostsModel = require("./../models/posts");
const CommentsModel = require("./../models/comments");
const { privateRoute } = require("../middlewares/privateRoute");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.get("/api/comments/:post", privateRoute, async (req, res) => {
  try {
    const post = await PostsModel.findOne({
      type: "post",
      label: req.params.post,
    });
    const comments = await CommentsModel.find().sort({ date: 1 }).populate({
      path: "author",
      select: "_id avatar name",
    });

    const nestComments = (root, xs) =>
      xs
        .filter(({ parent_id }) => parent_id == root)
        .map(({ _id, parent_id, author, date, content, likes }) => ({
          _id,
          parent_id,
          author,
          date,
          content,
          likes,
          comment: nestComments(_id, xs),
        }));
    res.send(await nestComments(post._id, comments));
    //res.json({ post_id: post.id, comments: nestComments(post._id, comments) });
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
