const Comment = require("../models/Comment");
const express = require('express');

const router = express.Router();

router.post("/", async (req, res) => {
  const comment = new Comment(req.body);
  await comment.save();
  res.json(comment);
});

router.get("/:blogId", async (req, res) => {
  try {
    const comments = await Comment.find({ blog_entry_id: req.params.blogId })
      .populate("user_id", "username"); // Hier werden Usernamen geholt
    
    res.json({ status: 200, data: comments });
  } catch (error) {
    console.error("Fehler beim Abrufen der Kommentare:", error);
    res.status(500).json({ message: "Fehler beim Abrufen der Kommentare" });
  }
});



module.exports = router;