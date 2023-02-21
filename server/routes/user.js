const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.connect(process.env.HOST);
mongoose.set("strictQuery", false);
const UsersModel = require("../models/users");
/* const { publicRoute } = require("../middlewares/publicRoute");
const cookieParser = require("cookie-parser");
router.use(cookieParser()); */

router.get("/api/user/:name", async (req, res) => {
  try {
    const user = await UsersModel.findOne(
      { name: req.params.name },
      { password: 0, __v: 0 }
    );

    res.send(user);
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
