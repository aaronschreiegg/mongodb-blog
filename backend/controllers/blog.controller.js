import Blog from "../models/blog.model.js";
import mongoose from 'mongoose';
import BlogUser from "../models/blog-user.model.js";


async function getAllBlogs(req, res) {
    try {
        const blogs = await Blog.find()
            .populate({
                path: 'author_ids',
                model: 'BlogUser',
                select: 'username firstname lastname'
            })
            .populate('category_id', 'name')
            .sort({ creationDate: -1 });
        return res.status(200).json({
            status: 200,
            data: blogs
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Ein Fehler ist aufgetreten',
            error: error.message
        });
    }
}

async function getBlogById(req, res) {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate({
                path: 'author_ids',
                model: 'BlogUser',
                select: 'username firstname lastname'
            })
            .populate('category_id', 'name');
        
        if (!blog) {
            return res.status(404).json({
                status: 404,
                message: 'Blog nicht gefunden'
            });
        }

        return res.status(200).json({
            status: 200,
            data: blog
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Ein Fehler ist aufgetreten',
            error: error.message
        });
    }
}

async function createTestBlog(req, res) {
    try {
        const testBlog = new Blog({
            title: "Test Blog Eintrag",
            author_ids: ["6579a1b2c3d4e5f6a7b8c9d0"],  // Dummy ID
            description: "Dies ist ein Test-Blog-Eintrag",
            content_text: "Hier steht der Inhalt des Test-Blog-Eintrags.",
            commentsAllowed: true
        });

        await testBlog.save();
        
        return res.status(201).json({
            status: 201,
            message: 'Test-Blog wurde erstellt',
            data: testBlog
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Ein Fehler ist aufgetreten',
            error: error.message
        });
    }
}

async function createBlog(req, res) {
    try {
        const { title, author, description, content, commentsAllowed, images, category_id } = req.body;
        
        // Erstelle eine temporäre Author-ID
        const tempAuthorId = new mongoose.Types.ObjectId();
        
        const blog = new Blog({
            title,
            author_ids: [tempAuthorId],
            description,
            content_text: content || '', // Stelle sicher, dass content_text immer einen Wert hat
            commentsAllowed,
            content_images: images || [],
            category_id: category_id // Füge die Kategorie-ID hinzu
        });

        await blog.save();
        
        return res.status(201).json({
            status: 201,
            message: 'Blog wurde erfolgreich erstellt',
            data: blog
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Ein Fehler ist aufgetreten',
            error: error.message
        });
    }
}

export default {
    getAllBlogs: getAllBlogs,
    createTestBlog: createTestBlog,
    createBlog: createBlog,
    getBlogById: getBlogById
};