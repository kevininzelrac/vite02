const express = require("express");
const app = express();
app.use(express.json());

const http = require("http");
const server = http.createServer(app);
require("dotenv").config();

const cors = require("cors");
app.use(cors({ credentials: true, origin: "*" }));

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    //methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("favorite", (data) => {
    io.emit("favorite", data);
  });
});

const user = require("./routes/user");
app.use("/", user);

const login = require("./routes/login");
app.use("/", login);

const logout = require("./routes/logout");
app.use("/", logout);

const nav = require("./routes/nav");
app.use("/", nav);

const pages = require("./routes/pages");
app.use("/", pages);

const updatepage = require("./routes/updatepage");
app.use("/", updatepage);

const posts = require("./routes/posts");
app.use("/", posts);

const category = require("./routes/category");
app.use("/", category);

const singlePost = require("./routes/singlePost");
app.use("/", singlePost);

const comments = require("./routes/comments");
app.use("/", comments);

const addComment = require("./routes/addComment");
app.use("/", addComment);

const likeComment = require("./routes/likeComment");
app.use("/", likeComment);

const unlikeComment = require("./routes/unlikeComment");
app.use("/", unlikeComment);

server.listen(5001, () => {
  console.log(`Server listening on 5001`);
});
