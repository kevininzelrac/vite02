const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const { verify } = require("jsonwebtoken");
const mongoose = require("mongoose");
mongoose.connect(process.env.HOST);
mongoose.set("strictQuery", false);
const UsersModel = require("../models/users");

router.get("/api/logout", async (req, res) => {
  try {
    const refreshToken = await req.cookies["refreshToken"];
    const user = verify(refreshToken, process.env.REFRESH_TOKEN);
    await UsersModel.updateOne(
      { name: await user.name },
      { $set: { refreshToken: "" } }
    );

    res.cookie("refreshToken", "none", {
      maxAge: new Date(Date.now() + 5 * 1000),
      httpOnly: true,
    });
    res.send({ message: "User logged out successfully" });
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
