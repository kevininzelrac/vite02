const UsersModel = require("../models/users");
const { sign, verify } = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = await req.headers["authorization"];
    const accessToken = await authHeader?.split(" ")[1];
    const verifiedAccess = verify(accessToken, process.env.ACCESS_TOKEN);
    if (verifiedAccess) {
      req.accessToken = accessToken;
      req.user = verifiedAccess;
      return next();
    }
  } catch (err) {
    const refreshToken = await req.cookies["refreshToken"];
    verify(refreshToken, process.env.REFRESH_TOKEN, async (err, user) => {
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
        res.send({
          error: "Not Allowed, please Log in or Register",
        });
      }
    });
  }
};

module.exports = { verifyToken };
