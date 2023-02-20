const mongoose = require("mongoose");
mongoose.connect(process.env.HOST);
mongoose.set("strictQuery", false);
const UsersModel = require("../models/users");
const { sign, verify } = require("jsonwebtoken");

const publicRoute = async (req, res, next) => {
  try {
    const authHeader = await req.headers["authorization"];
    const accessToken = await authHeader?.split(" ")[1];
    const verifiedAccess = verify(accessToken, process.env.ACCESS_TOKEN);
    //if (verifiedAccess) {
    req.accessToken = accessToken;
    req.user = verifiedAccess;
    return next();
    //}
  } catch (err) {
    try {
      const refreshToken = await req.cookies["refreshToken"];
      const verifiedRefresh = verify(refreshToken, process.env.REFRESH_TOKEN);
      //if (verifiedRefresh) {
      const mongo = await UsersModel.findOne(
        {
          name: verifiedRefresh.name,
          refreshToken: refreshToken,
        },
        { password: 0 }
      );
      const newAccessToken = sign(
        { name: mongo.name },
        process.env.ACCESS_TOKEN,
        { expiresIn: "1m" }
      );
      req.accessToken = newAccessToken;
      //req.user = verifiedRefresh;
      req.user = mongo;
      return next();
      //}
    } catch (error) {
      req.accessToken = "";
      req.user = "";
      return next();
      /* res.json({
        error: "Not Allowed, please Log in or Register",
      }); */
    }
  }
};

module.exports = { publicRoute };