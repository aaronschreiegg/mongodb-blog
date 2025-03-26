const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    blog_entry_id: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content_text: String,
  });

module.exports = mongoose.model("Comment", CommentSchema, "Comment");