const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    genre : String,

});

const Game = mongoose.model("Game", userSchema);
module.exports = Game;