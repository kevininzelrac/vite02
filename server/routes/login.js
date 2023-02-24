const express = require("express");
const router = express.Router();
const { auth } = require("./../middlewares/auth");
const { sign } = require("jsonwebtoken");
const UsersModel = require("../models/users");

router.post("/", auth, async (req, res) => {
  try {
    const accessToken = sign(
      { name: await req.user.name },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1m" }
    );

    const refreshToken = sign(
      { name: await req.user.name },
      process.env.REFRESH_TOKEN
    );

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    const user = await UsersModel.findOne(
      { name: await req.user.name },
      { password: 0, __v: 0 }
    );
    user.refreshToken = refreshToken;
    await user.save();

    res.send({
      accessToken: accessToken,
      name: await req.user.name,
      user: user,
    });
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
