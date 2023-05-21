const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  id: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  title: { type: String, required: true, minlength: 5 },
  text: { type: String, required: true, minlength: 5 },
  author: { type: String, required: true },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
