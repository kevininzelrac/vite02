const UsersModel = require("../models/users");

const users = async (io, socket) => {
  /* const user = await UsersModel.findOne(
    { name: await socket.user.name, socket: { $nin: ["", null] } },
    { password: 0, __v: 0 }
  );
  if (!user) { */
  await UsersModel.updateOne(
    { name: await socket.user.name },
    { $set: { socket: true } }
  );
  const users = await UsersModel.find(
    { socket: true },
    { password: 0, __v: 0, email: 0, refreshToken: 0 }
  );
  io.emit("users", users);
  socket.on("fetchUsers", () => socket.emit("users", users));
  console.log(socket.user.name + " just connected ");

  //}
};

module.exports = users;
