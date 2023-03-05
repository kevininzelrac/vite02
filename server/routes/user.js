const express = require("express");
const router = express.Router();
const { privateRoute } = require("../middlewares/privateRoute");

router.get("/", privateRoute, async (req, res) => {
  try {
    res.send({ user: req.user, accessToken: req.accessToken });
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
