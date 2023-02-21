const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.connect(process.env.HOST);
mongoose.set("strictQuery", false);
const PostsModel = require("../models/posts");

const { publicRoute } = require("../middlewares/publicRoute");

router.get("/api/nav", publicRoute, async (req, res) => {
  try {
    const nav = await PostsModel.find({
      $or: [
        {
          type: "page",
        },
        {
          type: "post",
        },
        {
          type: "category",
        },
      ],
    });

    const ImRecursive = (root, target) =>
      target
        .filter(({ category }) => category == root)
        .map(({ label, type }) => ({
          label,
          type,
          children: ImRecursive(label, target),
        }));

    res.send({ user: await req.user, nav: await ImRecursive("", nav) });
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
