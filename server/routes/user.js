const express = require("express");
const router = express.Router();
const { privateRoute } = require("../middlewares/privateRoute");

router.get("/", privateRoute, async (req, res) => {
  try {
    res.send({ user: await req.user });
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
