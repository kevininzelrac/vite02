const MessagesModel = require("../models/messages");

const rooms = async (io, socket, target) => {
  const messages = await MessagesModel.find({
    $or: [
      {
        from: target,
      },
      {
        to: target,
      },
    ],
  })
    .sort({ date: -1 })
    .populate({
      path: "from to",
      select: "_id avatar name",
    });

  const rooms = messages.reduce((accumulator, current) => {
    if (!accumulator.find((item) => current.from.name === item.blob)) {
      accumulator.push({
        blob: current.from.name,
        from: current.from,
        to: current.to,
        _id: current._id,
        date: current.date,
        status: current.status,
        message: current.message,
      });
    }
    if (!accumulator.find((item) => current.to.name === item.blob)) {
      accumulator.push({
        blob: current.to.name,
        from: current.from,
        to: current.to,
        _id: current._id,
        date: current.date,
        status: current.status,
        message: current.message,
      });
    }
    return accumulator;
  }, []);

  //console.log(socket.user.name);
  //console.log(target.name);
  //console.log(rooms);

  io.to(target.name).emit("rooms", rooms);
  socket.on("fetchRooms", () => socket.emit("rooms", rooms));
};

module.exports = rooms;
