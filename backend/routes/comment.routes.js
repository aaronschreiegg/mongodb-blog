import express from 'express';
import { getCommentsByBlogId, createComment } from '../controllers/comment.controller.js';

const router = express.Router();

// GET /comments/:blogId - Alle Kommentare eines Blogs abrufen
router.get('/:blogId', getCommentsByBlogId);

// POST /comments - Neuen Kommentar erstellen
router.post('/', createComment);

export default router; 