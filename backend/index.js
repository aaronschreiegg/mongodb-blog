const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://admin:weLoveMongo@mongo:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB connected');
});

// Blog Schema and Model
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  creationDate: Date,
  editDates: [Date],
  impressionCount: { type: Number, default: 0 },
  content: String,
  commentsAllowed: Boolean,
  images: [String],  // Base64-encoded images
});

const Blog = mongoose.model('Blog', blogSchema);

// API Endpoint to create a new blog
app.post('/api/blogs', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create blog entry' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
