const MessagesModel = require("../models/messages");
const rooms = require("./rooms.io");

const messages = (io, socket) => {
  //////////////////////////////////////////
  ///MESSAGES
  socket.on("fetchMessages", async ({ from, to }) => {
    const messages = await MessagesModel.find(
      {
        $and: [
          {
            from: { $in: [from._id, to._id] },
          },
          {
            to: { $in: [from._id, to._id] },
          },
        ],
      },
      { __v: 0 }
    )
      .sort({
        date: 1,
      })
      .populate({
        path: "from to",
        select: "_id avatar name",
      });

    socket.emit("messages", { from, to, messages });
  });

  //////////////////////////////////////////
  ///NEW MESSAGE
  socket.on("newMessage", async ({ from, to, message }) => {
    await new MessagesModel({
      from: await from,
      to: await to,
      status: "sent",
      message: await message,
      date: new Date(),
    }).save();

    const messages = await MessagesModel.find(
      {
        $and: [
          {
            from: { $in: [from._id, to._id] },
          },
          {
            to: { $in: [from._id, to._id] },
          },
        ],
      },
      { __v: 0 }
    )
      .sort({
        date: 1,
      })
      .populate({
        path: "from to",
        select: "_id avatar name",
      });

    rooms(io, socket, from);
    rooms(io, socket, to);

    io.to(from.name).to(to.name).emit("messages", { from, to, messages });
    socket.to(to.name).emit("notifications", {
      author: from,
      date: new Date(),
      title: "vous a envoyé un nouveau message",
      content: message,
    });
  });
};

module.exports = messages;
