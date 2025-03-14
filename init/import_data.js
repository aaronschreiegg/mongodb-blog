// Verbindung zur Blog-Datenbank
const fs = require("fs");

const imagePath = "/data/pics/image.jpg";
const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });
console.log(imageBase64);
db = db.getSiblingDB("Blog");





// 1. Nutzer hinzufügen
const users = [
    { username: "leopold", firstname: "Leopold", lastname: "Mistelberger", password: "passme", email: "leopold@example.com" },
    { username: "aaron", firstname: "Aaron", lastname: "Schreiegg", password: "pass123", email: "aaron@example.com" },
    { username: "simon", firstname: "Simon", lastname: "Pesut", password: "pass456", email: "simon@example.com" },
    { username: "timon", firstname: "Timon", lastname: "Schmalzer", password: "techpass", email: "timon@example.com" },
    { username: "elias", firstname: "Elias", lastname: "Mahr", password: "writing", email: "elias@example.com" }
];

db.BlogUser.insertMany(users);

// Nutzer-IDs abrufen
const userIds = db.BlogUser.find().map(user => user._id);

// 2. Kategorien hinzufügen
const categories = [
    { name: "Technology" },
    { name: "Travel" },
    { name: "Food" }
];
db.BlogCategory.insertMany(categories);

// Kategorie-IDs abrufen
const categoryIds = db.BlogCategory.find().map(cat => cat._id);

// 3. Blog-Einträge hinzufügen
const blogEntries = [
    {
        title: "MongoDB Basics",
        author_ids: [userIds[0], userIds[3]], // Admin & TechGuy als Autoren
        description: "An introduction to MongoDB.",
        creationDate: new Date(),
        editDates: [],
        impressionCount: 10,
        commentsAllowed: true,
        content_text: "MongoDB is a NoSQL database...",
        content_images: [imageBase64], // Keine Bilder in diesem Eintrag
        category_id: categoryIds[0]
    },
    {
        title: "Best Travel Destinations",
        author_ids: [userIds[2]], // JaneDoe als Autorin
        description: "The best places to visit in 2025.",
        creationDate: new Date(),
        editDates: [],
        impressionCount: 25,
        commentsAllowed: true,
        content_text: "If you're planning your next vacation...",
        content_images: [imageBase64], // Beispielbilder
        category_id: categoryIds[1]
    },
    {
        title: "Delicious Recipes",
        author_ids: [userIds[4]], // Alice als Autorin
        description: "Try these amazing dishes at home.",
        creationDate: new Date(),
        editDates: [],
        impressionCount: 5,
        commentsAllowed: false,
        content_text: "Cooking is an art...",
        content_images: [imageBase64],
        category_id: categoryIds[2]
    }
];
db.BlogEntry.insertMany(blogEntries);

// Blog-IDs abrufen
const blogIds = db.BlogEntry.find().map(blog => blog._id);

// 4. Kommentare hinzufügen (nur zu Einträgen, wo commentsAllowed = true)
const comments = [
    { blog_entry_id: blogIds[0], user_id: userIds[1], content_text: "Great article!" },
    { blog_entry_id: blogIds[0], user_id: userIds[2], content_text: "Very helpful, thanks!" },
    { blog_entry_id: blogIds[1], user_id: userIds[0], content_text: "I want to visit these places!" },
    { blog_entry_id: blogIds[1], user_id: userIds[3], content_text: "Nice recommendations!" }
];
db.Comment.insertMany(comments);

print("✅ Testdaten erfolgreich hinzugefügt!");
