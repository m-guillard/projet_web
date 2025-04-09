const express = require('express');
const router = express.Router();
const games_db = require('../database/games') 

router.use(express.json());

// Il existe pleins de mots clés, on a router.post, router.get...
router.post('/', async (req, res) => {
    const data= req.body;
    console.log("TEST")
    console.log('Données reçues :', data["type"][1]);

    const matrice = {
        "fighting" : "Fighting",
        "adventure" : "Adventure",
        "moba" : "MOBA",
        "rpg" : "Role-playing (RPG)",
        "simulator" : "Simulator",
        "shooter": "Shooter"
    }

    try {
        if (data["type"][0] === 'note') {
            const games = await games_db.find({genres:matrice[data["type"][1]]}, {name:1,cover_url:1,rating:1}).sort({rating:-1}).limit(10)
            res.status(200).json(games);
        } else if (data["type"][0]  === 'découverte') {
            const games = await games_db.find({genres:matrice[data["type"][1]]}, {name:1,cover_url:1,rating:1}).sort({first_release_date:-1}).limit(10)
            res.status(200).json(games);
        } else if (data["type"][0]  === 'tendances') {
            const games = await games_db.find({genres:matrice[data["type"][1]]}, {name:1,cover_url:1,rating:1}).sort({rating_count:-1}).limit(10)
            res.status(200).json(games);
        } else {
            console.log("data inconnu :", data);
            res.status(400).json({ error: "data inconnu" });
        }
    } catch (error) {
        console.error("Erreur de base de données :", error);  // Log de l'erreur
        res.status(500).json({ error: "Une erreur est survenue sur le serveur" });
    }
})
module.exports = router;