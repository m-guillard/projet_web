const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nom: String,
    mdp : String,
    mail : String,
    dateNaissance : Date
});

const User = mongoose.model("User", userSchema);
module.exports = User;
