require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

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
    origin: process.env.ORIGIN,
  })
);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN,
  },
});

const UsersModel = require("./models/users");

const likes = require("./socket/likes.io");
const comments = require("./socket/comments.io");
const users = require("./socket/users.io");
const rooms = require("./socket/rooms.io");
const messages = require("./socket/messages.io");
const status = require("./socket/status.io");

io.use((socket, next) => {
  const user = socket.handshake.auth;
  if (!user) {
    return next(new Error("invalid username"));
  }
  socket.user = {
    _id: user._id,
    name: user.name,
    avatar: user.avatar,
  };
  socket.join(socket.user.name);
  next();
});

io.on("connection", async (socket) => {
  await users(io, socket);
  await rooms(io, socket, socket.user);
  likes(io, socket);
  comments(io, socket);
  messages(io, socket);
  status(io, socket);

  socket.on("disconnect", async () => {
    await UsersModel.updateOne(
      { name: socket.user.name },
      { $set: { socket: false } }
    );
    const users = await UsersModel.find(
      //{ socket: { $nin: ["", null] } },
      { socket: { $ne: false } },
      { password: 0, __v: 0 }
    );
    io.emit("users", users);
    console.log(socket.user.name + " disconnected");
  });
});

const user = require("./routes/user");
app.use("/api/user", user);

const login = require("./routes/login");
app.use("/api/login", login);

const logout = require("./routes/logout");
app.use("/api/logout", logout);

const updateUser = require("./routes/updateUser");
app.use("/api/updateUser", updateUser);

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

const trash = require("./routes/trash");
app.use("/api/trash", trash);

server.listen(5001, () => {
  console.log(`Server listening on 5001`);
});
