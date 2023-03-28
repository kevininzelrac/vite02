const MessagesModel = require("../models/messages");

const status = async (io, socket) => {
  socket.on("status", async ({ from, to, _id, status }) => {
    await MessagesModel.updateOne(
      { _id: await _id },
      { $set: { status: status } }
    );
    await io.to(from.name).to(to.name).emit("status", { from, _id, status });
  });
};

module.exports = status;
