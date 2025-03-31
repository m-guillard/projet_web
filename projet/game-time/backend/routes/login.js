const express = require('express');
const router = express.Router();
const users_db = require('../database/users')

router.use(express.json());

router.post('/', (req, res) => {
    const data = req.body;
    console.log('Données reçues :', {data});

    if(data["page"] == "inscription"){
        // On vérifier que userName n'est pas déjà dans la base

        // On vérifie que le mail est valide
        // On vérife que la date de naissance est valide
        // On vérifie que le mot de passe est le même que la confirmation de mot de passe
    }
    else if(data["page"] == "connexion"){
        // On vérifie qu'il existe le couple username/password
    }
    else if(data["page"] == "oubli"){
        // On envoie un mail pour changer de mot de passe
    }

    res.status(200).json({message:'Login success'});

})
module.exports = router;