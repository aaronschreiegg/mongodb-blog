import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    content_text: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    editDates: [{
        type: Date
    }],
    impressionCount: {
        type: Number,
        default: 0
    },
    commentsAllowed: {
        type: Boolean,
        default: true
    },
    content_images: [{
        type: String
    }],
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogCategory',
        required: true
    }
});

// Index für die Suche nach Titel und Autor
blogSchema.index({ title: 1, author: 1 }, { unique: true });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;