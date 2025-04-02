**

# Comment faire le lien entre le front et le back ?

## Arborescence

 - game-time
	 - backend
		 - database
			 - modeleDB1.js
			 - modeleDB2.js
		- routes
			- route1.js
			- route2.js
		- server.js
	-	frontend
		-	public
		-	src
			-	pages
				-	page1.js
				- page2.js
		- styles
			- style1.css
			- style2.css
		-	...
## page.js (frontend/src/pages/)
Votre fichier React est plus ou moins de cette forme :

    import  "../styles/login.css";
    import { useState } from  "react";
    import { useNavigate } from  "react-router-dom";

    function  Composant(){
	    return (<div>Votre code HTML</div>)
    }
   
    function  Page(){
	    const  navigate  =  useNavigate(); // Permet de passer à une autre page
	    const [variable, setVariable] =  useState("");
   
	    const  handleAction  =  async () => {
		    const  rep  =  await  fetch('http://localhost:5000/route', {
			    // Code pour récupérer et transmettre valeurs au backend
		    });
		    const  data  =  await  rep.json(); // Réponse du serveur
	    };
    
	    return(<div><Composant/></div>)
    }
    
    export  default  Page;

## server.js (backend/)
Il permet de faire le lien entre le front et le back. Il s'occupe des importations des bases de données. Il met aussi en commun toutes nos parties logiques. Il a à peu près cette tête :

    const express = require('express');
    const cors = require('cors');
    const mongoose = require("mongoose");
    
    // Import de toutes les routes
    const route1Routes = require("./routes/route1.js");
    const route2Routes = require("./routes/route2.js");
    
    const PORT = 5000;
    
    // Import de toutes les bases de données
    const DB1_DB = "mongodb://127.0.0.1/Db1";
    const DB2_DB = "mongodb://127.0.0.1/Db2";
    
    const app = express();
    app.use(cors());
    app.use(express.json());
    
    // Utilisation des routes (qui doivent être importées au préalable)
    app.use('/route1', route1Routes);
    app.use('/route2', route2Routes);
    
    // Connexion aux bases de données
    main().catch((err) => console.log(err));
    async function main() {
      await mongoose.connect(DB1_DB);
    }
    main().catch((err) => console.log(err));
    async function main() {
      await mongoose.connect(DB2_DB);
    }
    
    // Start the Express server
    app.get('/', (req, res) => {
      res.send('Hello from Express!');
    });
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
      });
## route.js (backend/routes/)
Ce fichier est la partie logique de chacune de nos parties. C'est ici qu'on reçoit toutes les données de nos front, qu'on les analyse, les formate... C'est aussi dans ce fichier qu'on va lire et écrire dans la base de données. 
Un p'tit [lien](https://expressjs.com/en/starter/basic-routing.html) sur les mots clés pour les routes : 
Voici sa tronche approximative :

    const express = require('express');
    const router = express.Router();
    const db1_db = require('../database/modeleDB1')
    
    router.use(express.json());

    // Fonction pour écrire dans la base de données
    const createElt = async(v1, v2) => {
      try {
        const db1 = new db1_db({
          champ1: v1,
          champ2: v2
        });

        await db1.save();
      } catch (error) {
        console.error('Erreur lors de la création du user :', error);
      }
    };
    
    // Il existe pleins de mots clés, on a router.post, router.get...
    router.post('/', async (req, res) => {
        // Toute votre logique
        // Appel à une fonction d'écriture
        createElt(valeur1, valeur2);
    })
    module.exports = router;
## modeleDB.js
Dans ce fichier, on a le modèle de la base de données, en gros on indique à quoi elle ressemble, quels sont les champs. Ce modèle est uniquement pour la base de données MangoDB. Voici à quoi ça ressemble :

    const mongoose = require("mongoose");
    
    const dbSchema = new mongoose.Schema({
        champ1: String,
        champ2: Date
    });
    
    const Db = mongoose.model("Db", userSchema);
    module.exports = Db;
## Avertissement
Ce truc qui est un tuto sans être un tuto est à prendre avec des pincettes. J'ai probablement fait des erreurs, mais c'est ce que j'ai cru comprendre du MERN.
Si il y a des bêtises écrites, hésitez pas à les corriger.
Et aussi, j'ai pas encore tout compris sur la lecture et l'écriture avec mongoose, mais dès que j'aurai plus d'infos, je les ajouterai !
Bon courage la teeeeaaaam ;p
