import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogUser',
        required: true
    }],
    description: {
        type: String,
        required: true
    },
    content_text: {
        type: String,
        required: true
    },
    content_images: [{
        type: String
    }],
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogCategory',
        required: true
    },
    commentsAllowed: {
        type: Boolean,
        default: true
    },
    impressionCount: {
        type: Number,
        default: 0
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    editDates: [{
        type: Date
    }]
}, {
    timestamps: true
});

// Index für die Suche nach Titel und Autor
blogSchema.index({ title: 1, author_ids: 1 }, { unique: true });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;