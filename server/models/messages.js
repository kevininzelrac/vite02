const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema({
  to: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
  },
  from: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
  },
  status: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const MessagesModel = mongoose.model("messages", MessagesSchema);
module.exports = MessagesModel;
