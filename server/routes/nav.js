const express = require("express");
const router = express.Router();
const PostsModel = require("../models/posts");

router.get("/", async (req, res) => {
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

    res.send(await ImRecursive("", nav));
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
