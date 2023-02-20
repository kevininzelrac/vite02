const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const CommentsSchema = new mongoose.Schema({
  parent_id: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
  },
  date: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
    },
  ],
});

const CommentsModel = mongoose.model("comments", CommentsSchema);
module.exports = CommentsModel;
