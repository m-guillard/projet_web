const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.use(express.json());

// === Modèle pour stocker les profils ===
const profileSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    profile: [{ category: String, score: Number }]
});

const Profile = mongoose.model("Profile", profileSchema);

// === POST : recevoir et stocker le profil du joueur ===
router.post('/', async (req, res) => {
    const data = req.body;

    console.log("Profil reçu :", data);

    if (!Array.isArray(data) || !data.every(d => d.category && typeof d.score === "number")) {
        return res.status(400).json({ message: "Format des données invalide." });
    }

    try {
        const newProfile = new Profile({ profile: data });
        await newProfile.save();
        res.status(200).json({ message: "Profil enregistré avec succès." });
    } catch (error) {
        console.error("Erreur lors de l'enregistrement :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});

// === GET : récupérer les derniers profils (exemple) ===
router.get('/', async (req, res) => {
    try {
        const allProfiles = await Profile.find().sort({ timestamp: -1 }).limit(10);
        res.status(200).json(allProfiles);
    } catch (error) {
        console.error('Erreur lors de la récupération des profils :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

module.exports = router;
