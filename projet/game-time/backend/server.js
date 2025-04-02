const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

// Import de toutes les routes
const loginRoutes = require("./routes/login.js");
const searchRoutes = require("./routes/search.js");

const PORT = 5000;

// Import de toutes les bases de données
const USERS_DB = "mongodb://127.0.0.1/users"; // Créée la database users si elle n'existe pas

const app = express();
app.use(cors());
app.use(express.json());

// Utilisation des routes (qui doivent être importées au préalable)
app.use('/login', loginRoutes);
app.use('/search', searchRoutes);

// Connexion aux bases de données
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(USERS_DB);
}

// Start the Express server
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
