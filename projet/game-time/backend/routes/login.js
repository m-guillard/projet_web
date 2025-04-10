const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const users_db = require('../database/users')

router.use(express.json());

const modifyCategory = async(categories, userId) => {
    try {
        const user = await users_db.findById(userId);
        const mapCategory = new Map(
            categories.map(item => [item.category, item.score])
          )
        user.category = mapCategory;

        await user.save();
    } catch (error) {
        return false;
    }
    return true;
};

const createUser = async(username, mail, bday, pswd, path_avatar, categories) => {
    console.log("Catégories reçues dans createUser :", categories);
    let mapCategory
    try{
        mapCategory = new Map(
        categories.map(item => [item.category, item.score])
        )
    } catch {
        mapCategory = {};
    }

    console.log(mapCategory);

    try {
        const user = new users_db({
            username: username,
            password: pswd,
            mail: mail,
            birthday: bday,
            avatar: path_avatar,
            category: mapCategory
        });

        await user.save();
    } catch (error) {
        return false;
    }
    return true;
};


router.post('/', async (req, res) => {
    const data = req.body;
    console.log('Données reçues :', {data});

    if(data.page == "inscription"){

        // On vérifier que userName n'est pas déjà dans la base
        var utilisateurs = await users_db.findOne({username: data["usernameInsc"]});
        // Regex pour verif entrée utilisateur
        const mailRegex = new RegExp("^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$");
        // Vérification dates
        const date = new Date(data["birthday"]);
        const date_jour = Date.now()
        //Regex pour vérifier que le mot de passe respecte les exigences
        const pswdRegex = new RegExp("(?=.*[A-Z])(?=.*[0-9])(?=.*[^\sa-zA-Z0-9]).{8,50}");

        if (data.usernameInsc=='' || data.mail=='' || data.birthday=='' || data.passwordInsc=='' || data.verifPassword=='') {
            return res.status(401).json({message: "Tous les champs n'ont pas été remplis"});
        }
        else if (utilisateurs){
            return res.status(409).json({message: "Nom d'utilisateur déjà pris"});
        }
        else if(!mailRegex.test(data.mail)){
            return res.status(401).json({message: "Format d'adresse mail incorrect"});
        }else if(isNaN(date)){
            return res.status(401).json({message: "Format de date incorrecte/Date inexistante"});
        }else if(date>date_jour){
            return res.status(401).json({message: "Date de naissance supérieure à la date du jour"});
        }else if(date.getFullYear()<1900){
            return res.status(401).json({message: "Impossible de rentrer une année inférieure à 1900"});
        }else if(!pswdRegex.test(data.passwordInsc)){
            return res.status(401).json({message: "Le mot de passe ne respecte les conditions"});
        }else if(data.passwordInsc!==data.verifPassword){
            return res.status(401).json({message: "Mot de passe et confirmation du mot de passe différents"});
        }else{
            // On hash le mot de passe
            const pswd_hash = await bcrypt.hash(data.passwordInsc, 10);
            // On enregistre le chemin
            const path = `/img/profile/p${data.imageSelected}.PNG`;
            // Tout est validé, on enregistre dans la base de données
            const newUser = await createUser(data.usernameInsc, data.mail, data.birthday, pswd_hash, path, data.categories);
            
            if (newUser){
                utilisateur = await users_db.findOne({username: data.usernameInsc});
                return res.status(201).json({message: "Inscription réussie", id:utilisateur._id});
            }else{
                return res.status(500).json({message: "Erreur serveur lors de l'inscription"});
            }
        }


    }
    else if(data.page == "connexion"){
        // On vérifie qu'il existe le couple username/password
        var utilisateur = await users_db.findOne({username: data.usernameConn});
        if (!utilisateur) {
            return res.status(401).json({message: "Utilisateur inconnu"});
        } else if (data.passwordConn){
            const isMatch = await bcrypt.compare(data.passwordConn, utilisateur.password);
            if (!isMatch){
                return res.status(401).json({message: "Mot de passe incorrect"});
            } else {
                if(data.categories){
                    const modif = modifyCategory(data.categories, utilisateur._id)
                    if (modif){
                        return res.status(201).json({message: "Connexion réussie et stats enregistrées", id:utilisateur._id});
                    }
                }

                return res.status(201).json({message: "Connexion réussie", id:utilisateur._id});
            }
        }
    }
    else if(data["page"] == "oubli"){
        // On envoie un mail pour changer de mot de passe
    }

})
module.exports = router;