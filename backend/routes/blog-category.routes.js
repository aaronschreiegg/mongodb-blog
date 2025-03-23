import express from 'express';
import blogCategoryController from '../controllers/blog-category.controller.js';

const router = express.Router();

// GET /categories - Alle Kategorien abrufen
router.get('/', blogCategoryController.getAllCategories);

// GET /categories/:id - Eine spezifische Kategorie abrufen
router.get('/:id', blogCategoryController.getCategoryById);

// POST /categories - Neue Kategorie erstellen
router.post('/', blogCategoryController.createCategory);

export default router; 