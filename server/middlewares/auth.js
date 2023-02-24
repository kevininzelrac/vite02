const UsersModel = require("../models/users");
const bcrypt = require("bcrypt");

const auth = async (req, res, next) => {
  const user = await UsersModel.findOne({ name: await req.body.name });

  if (!user) return res.status(404).send({ error: "User Doesn't Exist" });

  let match = await bcrypt.compare(await req.body.password, user.password);

  if (!match)
    return res
      .status(401)
      .send({ error: "Wrong Username and Password Combination" });

  req.user = user;
  return next();
};

module.exports = { auth };
