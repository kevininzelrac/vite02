const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.connect(process.env.HOST);
mongoose.set("strictQuery", false);
const CommentsModel = require("../models/comments");
//const { verifyToken } = require("../middlewares/verifyToken");
const { privateRoute } = require("../middlewares/privateRoute");
/* const cookieParser = require("cookie-parser");
router.use(cookieParser()); */

router.post("/api/unlikeComment", privateRoute, async (req, res) => {
  try {
    const comment = await CommentsModel.findOne({
      _id: await req.body._id,
    });
    const index = comment.likes.indexOf(await req.body.user_id);
    comment.likes.splice(index, 1);
    await comment.save();
    res.send(new Date());
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
