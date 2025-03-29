const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const login = require("./routes/login.js")

const PORT = process.env.PORT || 3000;
const app = express();
const mongoDB = "mongodb://127.0.0.1/users"; // Créée la database users si elle n'existe pas

app.use(cors())

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
