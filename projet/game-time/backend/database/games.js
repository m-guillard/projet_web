const mongoose = require("mongoose");

// Définir le schéma et le modèle
const gameSchema = new mongoose.Schema({
    igdb_id: Number,
    name: String,
    cover_url: String,
    platforms: [String],
    summary: String,
    first_release_date: Number,
    genres: [String],
    rating: Number,
    rating_count: Number,
});

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
