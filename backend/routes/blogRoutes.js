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
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog nicht gefunden" });
    }

    // Aktuelles Datum in editDates pushen
    blog.editDates.push(new Date());

    // Felder aus req.body übernehmen
    blog.title = req.body.title;
    blog.author_ids = req.body.author_ids;
    blog.description = req.body.description;
    blog.content_text = req.body.content_text;
    blog.commentsAllowed = req.body.commentsAllowed;
    blog.content_images = req.body.content_images;
    blog.category_id = req.body.category_id;

    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    console.error("Fehler beim Aktualisieren:", error);
    res.status(500).json({ message: "Fehler beim Aktualisieren" });
  }
});

router.put('/impression/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
        req.params.id,
        { $inc: { impressionCount: 1 } },
        { new: true }
    );
    res.json(blog);
  } catch (err) {
    console.error('Fehler beim Hochzählen der Impression:', err);
    res.status(500).json({ message: 'Fehler beim Hochzählen' });
  }
});


module.exports = router;