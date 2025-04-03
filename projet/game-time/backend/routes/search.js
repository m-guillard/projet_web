const express = require('express');
const router = express.Router();
const users_db = require('../database/users');
const games_db = require('../database/games') 

router.use(express.json());

// Il existe pleins de mots clés, on a router.post, router.get...
router.post('/', async (req, res) => {
    const data = req.body;
    console.log('Données reçues :', {data});

    if(data["page"] == "profile"){
        var utilisateurs = await users_db.find({username: new RegExp(data.value, "i")});
        res.json(utilisateurs)

    }else if(data["page"] == "game"){
        var games = await games_db.find({name: new RegExp(data.value, "i")});
        res.json(games)
    }
})
module.exports = router;