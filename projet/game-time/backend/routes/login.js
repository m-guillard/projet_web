const express = require('express');
const router = express.Router();
const users_db = require('../database/users')

router.use(express.json());

router.post('/', async (req, res) => {
    const data = req.body;
    console.log('Données reçues :', {data});

    if(data["page"] == "inscription"){

        // On vérifier que userName n'est pas déjà dans la base
        var utilisateurs = await users_db.find({username: data["username"]});
        console.log(utilisateurs);
        if (utilisateurs.length){
            console.log("Il y a déjà un utilisateeeeeeur");
        }
        else{
            console.log("Bienvenue", data["usernameInsc"]);
        }
        // On vérifie que le mail est valide
        const mailRegex = new RegExp("^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$")
        if(!mailRegex.test(data["mail"])){
            console.log("Erreur adresse mail");
        }else{
            console.log("Mail good");
        }
        // On vérife que la date de naissance est valide
        const dateRegex = new RegExp("^\d{4}-\d{2}-\d{2}$");
        if (!dateRegex.test(data["birthday"])){
            console.log("Problème format date");
        }else{
            const date = new Date(data["birthday"]);
            const date_jour = Date.now()
            
            if(isNaN(date)){
                console.log("Cette date n'existe pas");
            }
            else if(date>date_jour){
                console.log("Tu n'es pas né");
            }else if(date.getFullYear()<1900){
                console.log("Tu es mort");
            }else{
                console.log("Date valide")
            }
            
        }
        // On vérifie que le mot de passe est le même que la confirmation de mot de passe
        if(data["passwordpasswordInsc"]!=data["verifPassword"]){
            console.log("Mot de passe différent de la confirmation");
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