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
router.get("/api/pages/:page", async (req, res) => {
  try {
    const page = await PostsModel.findOne({ label: req.params.page });

    res.send(page);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
