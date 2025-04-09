const express = require('express');
const router = express.Router();
const users_db = require('../database/users')

router.use(express.json());

router.post('/', async (req, res) => {
    const data = req.body;
    if (!data.idUser) {
        return res.status(400).json({ message: "ID utilisateur manquant" });
    }
    const user = await users_db.findById(data.idUser);
    if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    const categories = user.category;
    if (!categories) {
        return res.status(404).json({message: "Catégories inexistantes"})
    }
    const categoryList = Array.from(categories.entries()).map(([key, value]) => ({
        category: key,
        score: value
      }));
    return res.status(200).json({message:"Données récupérées", stats:categoryList})
})
module.exports = router;