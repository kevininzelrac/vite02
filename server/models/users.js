const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  socket: {
    type: String,
  },
});

const UsersModel = mongoose.model("users", UsersSchema);
module.exports = UsersModel;
