import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    blog_entry_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogEntry',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogUser',
        required: true
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
    }]
});

export default mongoose.model('Comment', commentSchema); 