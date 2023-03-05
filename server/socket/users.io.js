const CommentsModel = require("../models/comments");
const UsersModel = require("../models/users");

module.exports = (io, socket) => {
  socket.on("fetchUsers", async ({ name }) => {
    await UsersModel.updateMany(
      { refreshToken: { $nin: ["", null] } },
      { $set: { socket: "on" } }
    );
    await UsersModel.updateMany(
      { refreshToken: ["", null] },
      { $set: { socket: "off" } }
    );

    const users = await UsersModel.find(
      { socket: "on" },
      { password: 0, __v: 0 }
    );
    io.emit("users", { name, users });
    const comments = await CommentsModel.find().sort({ date: 1 }).populate({
      path: "author",
      select: "_id avatar name socket",
    });
    io.emit("comments", comments);
  });

  socket.on("login", async ({ name }) => {
    await UsersModel.updateOne(
      { name: await name },
      { $set: { socket: "on" } }
    );
  });

  socket.on("logout", async ({ name }) => {
    await UsersModel.updateOne(
      { name: await name },
      { $set: { socket: "off" } }
    );
  });
};
