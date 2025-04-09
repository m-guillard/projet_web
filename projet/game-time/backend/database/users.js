const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password : String,
    mail : String,
    birthday : Date,
    avatar: String,
    category: {
        type: Map,
        of: Number
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
