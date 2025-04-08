const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1/gamedb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Modèle Game
const Game = mongoose.model('Game', new mongoose.Schema({
    igdb_id: Number,
    name: String,
    cover_url: String,
    platforms: [String],
    summary: String,
    release_date: Date,
    genres: [String],
    rating: Number,
    rating_count: Number,
    last_updated: Date
}));

app.use(express.json());

// Endpoint pour récupérer les données d'un jeu par nom
app.post('/fetchGames', async (req, res) => {
    const { gameName } = req.body;
    try {
        // Recherche du jeu par nom dans la base de données
        const game = await Game.findOne({ name: gameName });

        if (game) {
            // Si le jeu est trouvé, renvoie ses détails
            res.json(game);
        } else {
            // Si aucun jeu n'est trouvé, renvoie une erreur 404
            res.status(404).json({ error: 'Jeu non trouvé' });
        }
    } catch (error) {
        // En cas d'erreur (par exemple, problème de base de données), renvoie une erreur 500
        res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
});

app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});
