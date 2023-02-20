const express = require("express");
const router = express.Router();
const { auth } = require("./../middlewares/auth");
const { sign } = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const mongoose = require("mongoose");
mongoose.connect(process.env.HOST);
mongoose.set("strictQuery", false);
const UsersModel = require("../models/users");

router.post("/api/login", auth, async (req, res) => {
  try {
    const accessToken = sign(
      { name: req.user.name },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1m" }
    );

    const refreshToken = sign(
      { name: req.user.name },
      process.env.REFRESH_TOKEN
    );

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    /* await UsersModel.updateOne(
      { name: req.user.name },
      { $set: { refreshToken: refreshToken } }
    ); */
    const user = await UsersModel.findOne({ name: req.user.name });
    user.refreshToken = refreshToken;
    user.save();

    res
      .status(200)
      .json({ accessToken: accessToken, name: req.user.name, user: user });
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;
