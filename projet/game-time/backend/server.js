const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const loginRoutes = require("./routes/login.js")

const PORT = 5000;
const app = express();
const mongoDB = "mongodb://127.0.0.1/users"; // Créée la database users si elle n'existe pas

app.use(cors());
app.use(express.json())
app.use('/login', loginRoutes);

// main().catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect(mongoDB);
// }

// Start the Express server
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
