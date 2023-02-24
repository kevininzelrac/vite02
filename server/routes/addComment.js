const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.connect(process.env.HOST);
mongoose.set("strictQuery", false);

const CommentsModel = require("../models/comments");
const { privateRoute } = require("../middlewares/privateRoute");
/* const cookieParser = require("cookie-parser");
router.use(cookieParser()); */

router.post("/api/addComment", privateRoute, async (req, res) => {
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
