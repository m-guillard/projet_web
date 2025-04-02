const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const users_db = require('../database/users')

router.use(express.json());

const createUser = async(username, mail, bday, pswd) => {
    try {
        const user = new users_db({
            username: username,
            password: pswd,
            mail: mail,
            birthday: bday
        });

        await user.save();
    } catch (error) {
        console.error('Erreur lors de la création du user :', error);
    }
};


router.post('/', async (req, res) => {
    const data = req.body;
    console.log('Données reçues :', {data});

    if(data["page"] == "inscription"){

        // On vérifier que userName n'est pas déjà dans la base
        var utilisateurs = await users_db.find({username: data["username"]});
        // Regex pour verif entrée utilisateur
        const mailRegex = new RegExp("^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$");
        // Vérification dates
        const date = new Date(data["birthday"]);
        const date_jour = Date.now()

        if (utilisateurs.length){
            console.log("Il y a déjà un utilisateeeeeeur");
        }
        else if(!mailRegex.test(data["mail"])){
            console.log("Erreur adresse mail");
        }else if(isNaN(date)){
          console.log("Cette date n'existe pas");
        }else if(date>date_jour){
            console.log("Tu n'es pas né.e");
        }else if(date.getFullYear()<1900){
            console.log("Tu es mort.e");
        }else if(data["passwordInsc"]!==data["verifPassword"]){
            console.log("Mot de passe différent de la confirmation");
        }else{
            // On hash le mot de passe
            pswd_hash = await bcrypt.hash(data["passwordInsc"], 10);
            // Tout est validé, on enregistre dans la base de données
            createUser(data["usernameInsc"], data["mail"], data["birthday"], pswd_hash);
        }


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