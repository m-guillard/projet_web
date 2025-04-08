const express = require('express');
const router = express.Router();
const Game = require('../database/games');

router.use(express.json());

// Endpoint pour récupérer les données d'un jeu par nom
router.post('/', async (req, res) => {
    const {gameName} = req.body;
    try {
        // Recherche du jeu par nom dans la base de données
        const game = await Game.findOne({ name: gameName });

        if (game) {
            // Si le jeu est trouvé, renvoie ses détails
            res.status(201).json(game);
        } else {
            // Si aucun jeu n'est trouvé, renvoie une erreur 404
            res.status(404).json({ error: 'Jeu non trouvé' });
        }
    } catch (error) {
        // En cas d'erreur (par exemple, problème de base de données), renvoie une erreur 500
        res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
});

module.exports = router;
