const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS Middleware vor der Verwendung von Routen
app.use(cors({
    origin: "http://localhost:4200", // Erlaube nur Anfragen von dieser Domain
    methods: ["GET", "POST", "PUT", "DELETE"], // Erlaube bestimmte HTTP-Methoden
    allowedHeaders: ["Content-Type", "Authorization"] // Erlaube bestimmte Header
}));
app.use(express.json({ limit: '20mb' })); // oder mehr, z. B. '20mb'
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
// Middleware für JSON-Datenverarbeitung

// MongoDB-Verbindung
const mongoURI = process.env.MONGO_URI || "mongodb://admin:weLoveMongo@mongodb:27017/Blog?authSource=admin";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("MongoDB verbunden");
});

mongoose.connection.on("error", (err) => {
  console.log("Fehler bei der MongoDB-Verbindung: ", err);
});

mongoose.connection.once('open', () => {
    console.log('Verbindung zur MongoDB hergestellt');
    console.log('Verwendete Datenbank:', mongoose.connection.db.databaseName);
});

// Importiere Routen
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const commentRoutes = require("./routes/commentRoutes");

// Verwende Routen
app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);
app.use("/categories", categoryRoutes);
app.use("/comments", commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
