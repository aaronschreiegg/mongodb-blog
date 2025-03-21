const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogUser', required: true }],
    description: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
    editDates: [{ type: Date }],
    impressionCount: { type: Number, default: 0 },
    commentsAllowed: { type: Boolean, default: true },
    content_text: { type: String, required: true },
    content_images: [{ type: String }] 
});

const BlogEntry = mongoose.model('BlogEntry', blogSchema);

module.exports = BlogEntry;