const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  category: {
    type: String,
  },
  author: {
    type: String,
  },
  label: {
    type: String,
  },
  about: {
    type: String,
  },
  date: {
    type: String,
  },
  updated: {
    type: Date,
  },
  picture: {
    type: String,
  },
});

const PostsModel = mongoose.model("posts", PostsSchema);
module.exports = PostsModel;
