const express = require('express');
const router = express.Router();
const users_db = require('../database/users')


router.use(express.json());

router.post('/', async (req, res) => {
    const data = req.body;
    console.log(data);
    var utilisateur = await users_db.findOne({_id: data["id"]});

    if (utilisateur) {
        return res.status(201).json({'avatar':utilisateur.username,'datenaisssance':utilisateur.birthday, 'mail':utilisateur.mail});
    }else{
        return res.status(401).json('erreur serveur, utilisateur non trouvé')
    }
});

module.exports = router;