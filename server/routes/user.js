const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.connect(process.env.HOST);
mongoose.set("strictQuery", false);
const UsersModel = require("../models/users");
const { privateRoute } = require("../middlewares/privateRoute");
/* const cookieParser = require("cookie-parser");
router.use(cookieParser()); */

router.get("/api/user/", privateRoute, async (req, res) => {
  try {
    res.send({ user: await req.user });
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
