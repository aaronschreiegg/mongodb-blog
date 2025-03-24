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

module.exports = router;