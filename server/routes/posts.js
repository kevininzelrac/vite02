const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.connect(process.env.HOST);
mongoose.set("strictQuery", false);
const PostsModel = require("./../models/posts");
/* const { publicRoute } = require("../middlewares/publicRoute");
const cookieParser = require("cookie-parser");
router.use(cookieParser()); */

/* router.get("/api/pages/:page", publicRoute, async (req, res) => { */
router.get("/api/posts", async (req, res) => {
  try {
    const posts = await PostsModel.find({ type: "post" }).sort({ date: -1 });

    res.send(posts);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
