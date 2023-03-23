const CommentsModel = require("../models/comments");

const likes = (io, socket) => {
  socket.on("getLike", async () => {
    const likes = await CommentsModel.find({}, { _id: 1, likes: 1 });
    io.emit("likes", likes);
  });

  socket.on("like", async ({ comment_id, user_id }) => {
    const comment = await CommentsModel.findOne({
      _id: await comment_id,
    });
    if (comment.likes.includes(user_id)) {
      const index = comment.likes.indexOf(await user_id);
      comment.likes.splice(index, 1);
      await comment.save();
    } else {
      comment.likes.push(await user_id);
      await comment.save();
    }
    const likes = await CommentsModel.find({}, { _id: 1, likes: 1 });
    io.emit("likes", likes);
  });
};

module.exports = likes;
