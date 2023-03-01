const express = require("express");
const router = express.Router();

const PostsModel = require("../models/posts");
const { privateRoute } = require("../middlewares/privateRoute");

router.post("/", privateRoute, async (req, res) => {
  console.log(await req.body.about);
  console.log(await req.body.label);
  console.log(await req.user.name);
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
