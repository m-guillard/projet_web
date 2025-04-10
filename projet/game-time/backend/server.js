const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require("mongoose");
// const Init_Games = require("./database/init_games");

// Import de toutes les routes
const loginRoutes = require("./routes/login.js");
const searchRoutes = require("./routes/search.js");
const introRoutes = require("./routes/intro.js");
const profileRoutes = require("./routes/fetchProfile.js");
const gameRoutes = require("./routes/fetchGames.js");
const accueilRoutes = require("./routes/accueil.js");
const ProfileGames = require("./routes/ProfileGames.js");
const statsProfileRoute = require("./routes/statsProfile.js");
const ThemeRoute = require("./routes/themes.js");


const PORT = 5000;

// Import de toutes les bases de données
const USERS_DB = "mongodb://127.0.0.1/users";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Utilisation des routes (qui doivent être importées au préalable)
app.use('/login', loginRoutes);
app.use('/search', searchRoutes);
app.use('/intro', introRoutes);
app.use('/fetchGames', gameRoutes);
app.use('/fetchProfile', profileRoutes);
app.use('/accueil', accueilRoutes);
app.use('/ProfileGames', ProfileGames);
app.use('/statsProfile', statsProfileRoute)
app.use('/themes',ThemeRoute);


// Connexion aux bases de données
main().catch((err) => console.log(err));
async function main() {
  // console.log("import des jeux");
  // await Init_Games();
  console.log("connexion avec la base de donnée");
  await mongoose.connect(USERS_DB);
  console.log("Connexion à la base de données réussie  (wewe deso je raj des bricoles");
}

// Route pour sauvegarder les résultats dans un cookie
app.post("/save-result", (req, res) => {
  const { result } = req.body; // Récupère le résultat depuis le frontend

  if (!result) {
      return res.status(400).json({ message: "Aucun résultat trouvé" });
  }

  // Stocke le résultat dans un cookie (optionnel)
  res.cookie("userResult", result, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

  console.log("Résultat reçu et stocké :", result);
  res.json({ message: "Résultat sauvegardé avec succès !" });
});


// Start the Express server
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
