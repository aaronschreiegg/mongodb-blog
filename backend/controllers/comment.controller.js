import Comment from '../models/comment.model.js';
import Blog from '../models/blog.model.js';

async function getAllComments(req, res) {
    try {
        const comments = await Comment.find()
            .populate('blog_entry_id', 'title')
            .populate('user_id', 'username firstname lastname');
        return res.status(200).json({
            status: 200,
            data: comments
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Ein Fehler ist aufgetreten',
            error: error.message
        });
    }
}

export const getCommentsByBlogId = async (req, res) => {
    try {
        const comments = await Comment.find({ blog_entry_id: req.params.blogId })
            .sort({ created_at: -1 });
        return res.status(200).json({
            status: 200,
            data: comments
        });
    } catch (error) {
        console.error('Error in getCommentsByBlogId:', error);
        return res.status(500).json({
            status: 500,
            message: 'Fehler beim Abrufen der Kommentare'
        });
    }
};

export const createComment = async (req, res) => {
    try {
        const { blog_entry_id, user_id, content_text } = req.body;
        
        // Prüfe ob der Blog existiert und Kommentare erlaubt sind
        const blog = await Blog.findById(blog_entry_id);
        if (!blog) {
            return res.status(404).json({
                status: 404,
                message: 'Blog nicht gefunden'
            });
        }
        if (!blog.commentsAllowed) {
            return res.status(403).json({
                status: 403,
                message: 'Kommentare sind für diesen Blog nicht erlaubt'
            });
        }

        const comment = new Comment({
            blog_entry_id,
            user_id,
            content_text,
            created_at: new Date()
        });

        await comment.save();
        
        return res.status(201).json({
            status: 201,
            message: 'Kommentar wurde erfolgreich erstellt',
            data: comment
        });
    } catch (error) {
        console.error('Error in createComment:', error);
        return res.status(500).json({
            status: 500,
            message: 'Fehler beim Erstellen des Kommentars'
        });
    }
};

async function updateComment(req, res) {
    try {
        const { content_text } = req.body;
        const comment = await Comment.findById(req.params.id);
        
        if (!comment) {
            return res.status(404).json({
                status: 404,
                message: 'Kommentar nicht gefunden'
            });
        }

        comment.content_text = content_text;
        comment.editDates.push(new Date());
        await comment.save();

        return res.status(200).json({
            status: 200,
            message: 'Kommentar wurde erfolgreich aktualisiert',
            data: comment
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Ein Fehler ist aufgetreten',
            error: error.message
        });
    }
}

async function deleteComment(req, res) {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        
        if (!comment) {
            return res.status(404).json({
                status: 404,
                message: 'Kommentar nicht gefunden'
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'Kommentar wurde erfolgreich gelöscht'
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
    getAllComments,
    getCommentsByBlogId,
    createComment,
    updateComment,
    deleteComment
};