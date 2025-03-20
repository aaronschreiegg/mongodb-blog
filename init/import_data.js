const fs = require("fs");
const path = require("path");

const imageDir = "/data/pics";
const imageFiles = fs.readdirSync(imageDir);
const imagesBase64 = imageFiles.map(file =>
    fs.readFileSync(path.join(imageDir, file), { encoding: "base64" })
);

db = db.getSiblingDB("Blog");

const users = [
    { username: "leopold", firstname: "Leopold", lastname: "Mistelberger", password: "passme", email: "leopold@example.com" },
    { username: "aaron", firstname: "Aaron", lastname: "Schreiegg", password: "pass123", email: "aaron@example.com" },
    { username: "simon", firstname: "Simon", lastname: "Pesut", password: "pass456", email: "simon@example.com" },
    { username: "timon", firstname: "Timon", lastname: "Schmalzer", password: "techpass", email: "timon@example.com" },
    { username: "elias", firstname: "Elias", lastname: "Mahr", password: "writing", email: "elias@example.com" }
];

db.BlogUser.insertMany(users);

const userIds = db.BlogUser.find().toArray().map(user => user._id);



const categories = [
    { name: "Technology" },
    { name: "Travel" },
    { name: "Food" }
];
db.BlogCategory.insertMany(categories);


const blogEntries = [
    {
        title: "MongoDB Basics",
        author_ids: [userIds[0], userIds[3]],
        description: "An introduction to MongoDB.",
        creationDate: new Date(2025, 1, 14),
        editDates: [new Date(2025, 2, 11)],
        impressionCount: 10,
        commentsAllowed: true,
        content_text: "MongoDB is a NoSQL database...",
        content_images: [imagesBase64[0]],
    },
    {
        title: "Best Travel Destinations",
        author_ids: [userIds[2]],
        description: "The best places to visit in 2025.",
        creationDate: new Date(2025, 1, 17),
        editDates: [new Date(2025, 2, 4), new Date(2025, 2, 5)],
        impressionCount: 25,
        commentsAllowed: true,
        content_text: "If you're planning your next vacation...",
        content_images: [imagesBase64[1]],
    },
    {
        title: "Delicious Recipes",
        author_ids: [userIds[4]],
        description: "Try these amazing dishes at home.",
        creationDate: new Date(2025, 1, 19),
        editDates: [new Date(2025, 1, 22)],
        impressionCount: 5,
        commentsAllowed: false,
        content_text: "Cooking is an art...",
        content_images: [imagesBase64[3], imagesBase64[4]],
    }
];
db.BlogEntry.insertMany(blogEntries);

const blogIds = db.BlogUser.find().toArray().map(blog => blog._id);

const comments = [
    { blog_entry_id: blogIds[0], user_id: userIds[1], content_text: "Great article!" },
    { blog_entry_id: blogIds[0], user_id: userIds[2], content_text: "Very helpful, thanks!" },
    { log_entry_id: blogIds[1], user_id: userIds[0], content_text: "I want to visit these places!" },
    { blog_entry_id: blogIds[1], user_id: userIds[3], content_text: "Nice recommendations!" }
];
db.Comment.insertMany(comments);