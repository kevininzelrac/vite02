const express = require("express");
const app = express();
app.use(express.json());

require("dotenv").config();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const http = require("http");
const server = http.createServer(app);

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(process.env.HOST);

const cors = require("cors");
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5000", "https://vite02.onrender.com"],
  })
);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5000", "https://vite02.onrender.com"],
  },
});

const CommentsModel = require("./models/comments");

io.on("connection", async (socket) => {
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
});

const user = require("./routes/user");
app.use("/api/user", user);

const login = require("./routes/login");
app.use("/api/login", login);

const logout = require("./routes/logout");
app.use("/api/logout", logout);

const nav = require("./routes/nav");
app.use("/api/nav", nav);

const pages = require("./routes/pages");
app.use("/api/pages", pages);

const updatePage = require("./routes/updatepage");
app.use("/api/updatePage", updatePage);

const posts = require("./routes/posts");
app.use("/api/posts", posts);

const category = require("./routes/category");
app.use("/api/category", category);

const singlePost = require("./routes/singlePost");
app.use("/api/singlePost", singlePost);

const comments = require("./routes/comments");
app.use("/api/comments", comments);

const addComment = require("./routes/addComment");
app.use("/api/addComment", addComment);

/* const likeComment = require("./routes/likeComment");
app.use("/api/likeComment", likeComment);

const unlikeComment = require("./routes/unlikeComment");
app.use("/api/unlikeComment", unlikeComment); */

server.listen(5001, () => {
  console.log(`Server listening on 5001`);
});
