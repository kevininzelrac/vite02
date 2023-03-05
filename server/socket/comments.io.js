const CommentsModel = require("../models/comments");

module.exports = (io, socket) => {
  socket.on("getComments", async () => {
    const comments = await CommentsModel.find().sort({ date: 1 }).populate({
      path: "author",
      select: "_id avatar name socket",
    });
    io.emit("comments", comments);
  });

  socket.on("comment", async ({ author, parent_id, content }) => {
    await new CommentsModel({
      author: await author,
      parent_id: await parent_id,
      date: new Date(),
      content: await content,
    }).save();

    const comments = await CommentsModel.find().sort({ date: 1 }).populate({
      path: "author",
      select: "_id avatar name socket",
    });
    io.emit("comments", comments);
  });
};
