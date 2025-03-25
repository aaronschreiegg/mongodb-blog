const Blog = require("../models/Blog");
const express = require('express');

const router = express.Router();

router.get("/", async (req, res) => {
  const blogs = await Blog.find().populate("author_ids");
  res.json(blogs);
});

router.post("/", async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.json(blog);
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("author_ids");
  res.json(blog);
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog nicht gefunden" });
    }
    res.status(200).json({ message: "Blog gelöscht", deletedBlog });
  } catch (error) {
    console.error("Fehler beim Löschen:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    console.error("Fehler beim Aktualisieren:", error);
    res.status(500).json({ message: "Fehler beim Aktualisieren" });
  }
});

module.exports = router;