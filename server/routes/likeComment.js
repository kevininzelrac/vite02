const express = require("express");
const router = express.Router();
const CommentsModel = require("../models/comments");
const { privateRoute } = require("../middlewares/privateRoute");

router.post("/", privateRoute, async (req, res) => {
  try {
    const comment = await CommentsModel.findOne({
      _id: await req.body._id,
    });
    comment.likes.push(await req.body.user_id);
    await comment.save();
    res.send(new Date());
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
