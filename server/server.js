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
    origin: "*",
  },
});

const likes = require("./socket/likes.io");
const comments = require("./socket/comments.io");
const users = require("./socket/users.io");

io.on("connection", async (socket) => {
  likes(io, socket);
  comments(io, socket);
  users(io, socket);
});

const user = require("./routes/user");
app.use("/api/user", user);

const login = require("./routes/login");
app.use("/api/login", login);

const updateUser = require("./routes/updateUser");
app.use("/api/updateUser", updateUser);

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

server.listen(5001, () => {
  console.log(`Server listening on 5001`);
});
