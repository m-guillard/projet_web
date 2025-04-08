const express = require('express');
const router = express.Router();
const users_db = require('../database/users')

router.use(express.json());

router.post('/', async (req, res) => {
    const data = req.body;
    var utilisateur = await users_db.findOne({_id: data["id"]});

    if (utilisateur) {
        const month = utilisateur.birthday.getMonth()+1;
        return res.status(201).json({'avatarname':utilisateur.username,
                                     'avatar':utilisateur.avatar,
                                     'datenaissance':utilisateur.birthday.getDate().toString()+"/"+month+"/"+utilisateur.birthday.getFullYear().toString(),
                                     'mail':utilisateur.mail});
    }else{
        return res.status(400).json('erreur serveur, utilisateur non trouvé');
    }
});

module.exports = router;