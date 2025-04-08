const mongoose = require("mongoose");
const fs = require("fs");
const Game = require("./games.js"); // <--- vérifie le chemin ici

const Init_Games = async () => {

  const mongoDB = "mongodb://127.0.0.1:27017/users";

  try {
    await mongoose.connect(mongoDB);
    console.log("✅ Connecté à la base de données");
  } catch (err) {
    console.error("❌ Erreur de connexion MongoDB :", err);
    process.exit(1);
  }

  const jsonData = fs.readFileSync(__dirname + "/games.json", "utf-8");
  const games = JSON.parse(jsonData);

  const transformedGames = games.map(game => ({
    ...game,
    platforms: game.platforms ? game.platforms.map(p => p.name) : [],
    genres: game.genres ? game.genres.map(g => g.name) : []
  }));

  try {
    for (const i of transformedGames){
      await Game.replaceOne({name:i.name}, i,{ upsert: true });
    }
    console.log("✅ Données importées avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors de l'importation des données :", error);
  } finally {
    mongoose.connection.close();
  }
}

module.exports = Init_Games;
