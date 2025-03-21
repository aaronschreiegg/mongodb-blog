// Wechsle zur admin Datenbank
db = db.getSiblingDB('admin');

// Authentifiziere als root admin
db.auth('admin', 'weLoveMongo');

// Wechsle zur Blog Datenbank
db = db.getSiblingDB('Blog');

// Erstelle den Blog-Datenbankbenutzer
db.createUser({
    user: 'admin',
    pwd: 'weLoveMongo',
    roles: [
        {
            role: 'dbOwner',
            db: 'Blog'
        }
    ]
});

// Erstelle eine Test-Collection
db.createCollection('blogs');

// Füge einen Test-Eintrag hinzu
db.blogs.insertOne({
    title: "Test Blog",
    description: "Test Description",
    content_text: "Test Content"
}); 