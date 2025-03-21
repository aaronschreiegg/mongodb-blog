import express from "express";
import blogsController from "../controllers/blog.controller.js";

const router = express.Router();

router.get('/', blogsController.getAllBlogs);
router.get('/test', blogsController.createTestBlog);
router.post('/', blogsController.createBlog);
router.get('/:id', blogsController.getBlogById);

export default router;