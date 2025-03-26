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

// Kategorie aktualisieren
router.put('/:id', async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true }
        );
        
        if (!updatedCategory) {
            return res.status(404).json({ message: "Kategorie nicht gefunden" });
        }
        
        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error("Fehler beim Aktualisieren der Kategorie:", error);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Kategorie löschen
router.delete('/:id', async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        
        if (!deletedCategory) {
            return res.status(404).json({ message: "Kategorie nicht gefunden" });
        }
        
        res.status(200).json({ message: "Kategorie gelöscht", deletedCategory });
    } catch (error) {
        console.error("Fehler beim Löschen der Kategorie:", error);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

module.exports = router;