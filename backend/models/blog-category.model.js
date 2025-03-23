import mongoose from 'mongoose';

const blogCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const BlogCategory = mongoose.model('BlogCategory', blogCategorySchema);

export default BlogCategory; 