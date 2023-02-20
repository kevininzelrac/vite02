const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.connect(process.env.HOST);
mongoose.set("strictQuery", false);
const CommentsModel = require("../models/comments");
const { verifyToken } = require("../middlewares/verifyToken");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.post("/api/unlikeComment", verifyToken, async (req, res) => {
  try {
    const comment = await CommentsModel.findOne({
      _id: req.body._id,
    });
    const index = comment.likes.indexOf(req.body.user_id);
    comment.likes.splice(index, 1);
    await comment.save();
    res.json(new Date());
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;