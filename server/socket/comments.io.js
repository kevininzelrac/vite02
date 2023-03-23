const CommentsModel = require("../models/comments");

const comments = (io, socket) => {
  socket.on("getComments", async () => {
    const comments = await CommentsModel.find().sort({ date: 1 }).populate({
      path: "author",
      select: "_id avatar name socket",
    });
    io.emit("comments", comments);
  });

  socket.on("comment", async ({ user, parent_id, content }) => {
    await new CommentsModel({
      author: await user._id,
      parent_id: await parent_id,
      content: await content,
      date: new Date(),
    }).save();

    const comments = await CommentsModel.find().sort({ date: 1 }).populate({
      path: "author",
      select: "_id avatar name socket",
    });
    io.emit("comments", comments);

    socket.broadcast.emit("notifications", {
      author: user,
      date: new Date(),
      title: "a publié un nouveau commentaire",
      content: content,
    });
  });
};

module.exports = comments;
