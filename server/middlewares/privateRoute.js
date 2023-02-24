const mongoose = require("mongoose");
mongoose.connect(process.env.HOST);
mongoose.set("strictQuery", false);
const UsersModel = require("../models/users");
const { sign, verify } = require("jsonwebtoken");

const privateRoute = async (req, res, next) => {
  try {
    const authHeader = await req.headers["authorization"];
    //console.log("privateRoute authHeader : " + authHeader);
    const accessToken = await authHeader?.split(" ")[1];
    const verifiedAccess = verify(accessToken, process.env.ACCESS_TOKEN);
    if (verifiedAccess) {
      req.accessToken = await accessToken;
      req.user = verifiedAccess;

      //console.log("privateRoute verifiedAccessToken :" + verifiedAccess);

      return next();
    }
  } catch (err) {
    try {
      const refreshToken = await req.cookies["refreshToken"];
      const verifiedRefresh = verify(refreshToken, process.env.REFRESH_TOKEN);

      //console.log("privateRoute verifiedRefreshToken :");
      //console.log(verifiedRefresh);

      if (verifiedRefresh) {
        const mongo = await UsersModel.findOne(
          {
            name: await verifiedRefresh.name,
            refreshToken: refreshToken,
          },
          { refreshToken: 0, password: 0, __v: 0 }
        );
        const newAccessToken = sign(
          { name: mongo.name },
          process.env.ACCESS_TOKEN,
          { expiresIn: "1m" }
        );
        req.accessToken = newAccessToken;
        req.user = mongo;
        return next();
      } else {
        throw new Error("RefreshToken unvalid");
      }
    } catch (error) {
      res.send({
        error: "Not Allowed, please Log in or Register",
      });
    }
  }
};

module.exports = { privateRoute };

/*
AccessToken = Token in Bearer 
if( Verified AccessToken ) {
  re.user = AccessToken
  Next 
}else if( !AccessToken) {
  RefresToken = Token in Cookie
  if( Verified RefreshToken ) {
    if (verifiedToken = mongo.token) {
    create NewAccessToken
    Next
    }else{
    Not Allowed
    }
  }
}
*/
