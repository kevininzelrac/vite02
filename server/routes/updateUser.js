const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const UsersModel = require("../models/users");
const { privateRoute } = require("../middlewares/privateRoute");

router.post("/", privateRoute, async (req, res) => {
  try {
    const user = await UsersModel.findOne({
      author: await req.user.name,
    });
    if (await req.body.name) user.name = await req.body.name;
    if (await req.body.email) user.email = await req.body.email;
    if (await req.body.avatar) user.avatar = await req.body.avatar;
    if (await req.body.password) {
      const hash = await bcrypt.hash(await req.body.password, 10);
      user.password = hash;
    }

    await user.save();

    res.send({ success: "Vos modifications ont bien été sauvegardées" });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
