const express = require("express");
const router = express.Router();
const { verify } = require("jsonwebtoken");
const UsersModel = require("../models/users");

router.get("/", async (req, res) => {
  try {
    const refreshToken = await req.cookies["refreshToken"];
    const user = verify(refreshToken, process.env.REFRESH_TOKEN);

    await UsersModel.updateOne(
      { name: await user.name },
      { $set: { refreshToken: "" } }
    );

    res.cookie("refreshToken", "none", {
      maxAge: new Date(Date.now() + 1 * 100),
      httpOnly: true,
    });
    res.send({
      /* user: "",
      accessToken: "", */
      message: "User logged out successfully",
    });
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
