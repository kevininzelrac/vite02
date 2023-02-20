const mongoose = require("mongoose");
mongoose.connect(process.env.HOST);
mongoose.set("strictQuery", false);
const UsersModel = require("../models/users");
const { sign, verify } = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = await req.headers["authorization"];
    //const accessToken = (await authHeader) && authHeader.split(" ")[1];
    const accessToken = await authHeader?.split(" ")[1];
    const verifiedAccess = verify(accessToken, process.env.ACCESS_TOKEN);
    if (verifiedAccess) {
      req.accessToken = accessToken;
      req.user = verifiedAccess;
      return next();
    }
  } catch (err) {
    //console.log(err);
    const refreshToken = await req.cookies["refreshToken"];
    verify(refreshToken, process.env.REFRESH_TOKEN, async (err, user) => {
      /* if (err) {
        return res.json({
          error: "Not Allowed, please Log in or Register",
        });
      } */

      try {
        const mongo = await UsersModel.findOne({
          name: user.name,
          refreshToken: refreshToken,
        });
        const newAccessToken = sign(
          { name: mongo.name },
          process.env.ACCESS_TOKEN,
          { expiresIn: "1m" }
        );
        req.accessToken = newAccessToken;
        req.user = user;
        return next();
      } catch (error) {
        //console.log(error);
        res.json({
          error: "Not Allowed, please Log in or Register" /*err.message*/,
        });
      }
    });
  }
};

module.exports = { verifyToken };