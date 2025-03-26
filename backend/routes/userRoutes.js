const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

router.get("/", async (req, res) => {
    try {
      const users = await User.find(); // Retrieve all users
      console.log(users);
      res.json(users); // Return users as JSON
    } catch (err) {
      res.status(500).json({ message: "Error retrieving users" });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const users = await User.find({}, "username"); // Nur Benutzernamen abrufen
      res.json(users);
    } catch (error) {
      console.error("Fehler beim Abrufen der Benutzer:", error);
      res.status(500).json({ message: "Fehler beim Abrufen der Benutzer" });
    }
  });
  
module.exports = router;