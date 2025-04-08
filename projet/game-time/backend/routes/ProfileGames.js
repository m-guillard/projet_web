const express = require('express');
const router = express.Router();
const games_db = require('../database/games')

router.use(express.json());

// Il existe pleins de mots clés, on a router.post, router.get...
router.post('/', async (req, res) => {
    const data = req.body;
    console.log('Données reçues :', {data});

    // var notes_pers = Array(games_db.length());
    var games = await games_db.find({}, {name:1,cover_url:1,rating:1}).sort({rating:-1}).limit(10);
    res.status(201).json(games);
})
module.exports = router;