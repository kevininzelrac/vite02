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
router.get("/api/category/:category", async (req, res) => {
  try {
    const category = await PostsModel.find({
      //type: "post",
      category: req.params.category,
    }).sort({ date: -1 });

    res.send(category);
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
