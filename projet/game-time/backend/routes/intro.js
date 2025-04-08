const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.use(express.json());

// === Modèle pour stocker les profils ===
const profileSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    profile: [{ category: String, score: Number }]
});

const ProfileStat = mongoose.model("ProfileStat", profileSchema);

// === POST : recevoir et stocker les stats profil du joueur ===
router.post('/', async (req, res) => {
    const data = req.body;

    console.log("ProfilStats reçu :", data);

    if (!Array.isArray(data) || !data.every(d => d.category && typeof d.score === "number")) {
        return res.status(400).json({ message: "Format des données invalide." });
    }

    try {
        const newProfileStat = new ProfileStat({ profile: data });
        await newProfileStat.save();
        res.status(200).json({ message: "Stats de profil enregistrées avec succès." });
    } catch (error) {
        console.error("Erreur lors de l'enregistrement :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});

// === GET : récupérer les derniers profils (exemple) ===
router.get('/', async (req, res) => {
    try {
        const allProfilesStats = await ProfileStat.find().sort({ timestamp: -1 }).limit(10);
        res.status(200).json(allProfilesStats);
    } catch (error) {
        console.error('Erreur lors de la récupération des profils stats :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// Debug: voir tous les profils enregistrés
router.get('/debug/all-profiles', async (req, res) => {
    console.log("Debug all profiles route reached");
    try {
      const profiles = await ProfileStat.find().sort({ timestamp: -1 });
      res.status(200).json(profiles);
    } catch (err) {
      console.error("Erreur debug récupération profils :", err);
      res.status(500).json({ message: "Erreur serveur." });
    }
  });

module.exports = router;
