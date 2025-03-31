const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password : String,
    mail : String,
    birthday : Date
});

const User = mongoose.model("User", userSchema);
module.exports = User;
