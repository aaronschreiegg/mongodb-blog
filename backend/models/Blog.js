const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
    title: String,
    author_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    description: String,
    creationDate: { type: Date, default: Date.now },  // Standard-Wert setzen
    editDates: { type: [Date], default: [] }, // Standard: leeres Array
    impressionCount: { type: Number, default: 0 },
    commentsAllowed: { type: Boolean, default: true },
    content_text: String,
    content_images: { type: [String], default: [] },  // Falls undefined, setze leeres Array
});

module.exports = mongoose.model("Blog", BlogSchema, "BlogEntry");