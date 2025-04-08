import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Game from "./games.js"; // <--- vérifie le chemin ici

// Pour recréer __dirname (car pas dispo en ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mongoDB = "mongodb://127.0.0.1:27017/games";

try {
  await mongoose.connect(mongoDB);
  console.log("✅ Connecté à la base de données");
} catch (err) {
  console.error("❌ Erreur de connexion MongoDB :", err);
  process.exit(1);
}

const filePath = path.join(__dirname, "games.json");
const jsonData = fs.readFileSync(filePath, "utf-8");
const games = JSON.parse(jsonData);

const transformedGames = games.map(game => ({
  ...game,
  platforms: game.platforms ? game.platforms.map(p => p.name) : [],
  genres: game.genres ? game.genres.map(g => g.name) : []
}));

try {
  await Game.insertMany(transformedGames);
  console.log("✅ Données importées avec succès !");
} catch (error) {
  console.error("❌ Erreur lors de l'importation des données :", error);
} finally {
  mongoose.connection.close();
}
