const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");
const users_db = require("../database/users"); // Assure-toi que ce chemin est correct

const mongoDB = "mongodb://127.0.0.1/users"; // Mets l'URL de ta DB

async function generateUsers() {
    try {
        await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("✅ Connecté à la base de données");
        
        let users = [];
        for (let i = 0; i < 10; i++) {
            const username = faker.internet.username();
            const mail = faker.internet.email();
            const birthday = faker.date.birthdate({ min: 1900, max: 2010, mode: 'year' });
            const password = await bcrypt.hash("password123", 10); // Mot de passe hashé

            users.push({ username, mail, birthday, password });
        }

        await users_db.insertMany(users);
        console.log("10 utilisateurs ajoutés avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'insertion :", error);
    } finally {
        mongoose.connection.close();
    }
}

generateUsers();
