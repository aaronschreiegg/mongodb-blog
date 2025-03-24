const Category = require("../models/Category");
const express = require('express');

const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find();
  console.log(categories);
  res.json(categories);
});

router.post('/', (req, res) => {
    const newCategory = new Category({ name: req.body.name });
    newCategory.save()
        .then(category => res.status(201).json(category))
        .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;