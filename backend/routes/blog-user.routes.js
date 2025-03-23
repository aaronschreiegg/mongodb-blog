import express from 'express';
import { getAllUsers, createUser, getUserById } from '../controllers/blog-user.controller.js';

const router = express.Router();

// GET /api/users - Alle Benutzer abrufen
router.get('/', getAllUsers);

// POST /api/users - Neuen Benutzer erstellen
router.post('/', createUser);

// GET /api/users/:id - Benutzer nach ID abrufen
router.get('/:id', getUserById);

export default router; 