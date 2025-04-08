const express = require('express');
const router = express.Router();
const games_db = require('../database/games') 

router.use(express.json());

// Il existe pleins de mots clés, on a router.post, router.get...
router.post('/', async (req, res) => {
    const data = req.body;
    console.log('Données reçues :', {data});

    if(data == "note"){
        var games = await users_db.find([{ $sort: { rating: -1 } }, { $limit: 10 } ]);
        res.json(games)

    }else if(data == "découverte"){
        var games = await games_db.find([{ $sort: { release_date: -1 } }, { $limit: 10 }]);
        res.json(games)
    }else if(data == "tendance"){
        var games = await games_db.find([{name: new RegExp(data.value, "i")}, { $limit: 10 }]);
        res.json(games)
    }
})
module.exports = router;