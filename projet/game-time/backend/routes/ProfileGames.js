const express = require('express');
const router = express.Router();
const games_db = require('../database/games');

router.use(express.json());

const matrice = {
    'Animaux mignons':  [0,2,1,0,0,2,0,5,4,2,1,1,0,0,0,1,0,4,0,0,0,0,1],
    'Violent':          [1,0,0,4,5,0,1,0,0,0,0,0,0,0,0,1,5,0,0,0,0,0,0],
    'Exploration':      [5,0,0,0,2,0,0,0,0,0,4,0,0,2,0,4,0,0,0,0,0,0,0],
    "Difficulté":       [2,2,1,4,2,0,5,2,0,2,1,4,1,2,5,3,3,1,1,5,4,5,0],
    "Dynamique":        [2,3,0,5,4,0,5,4,0,3,0,0,0,5,3,1,5,0,3,3,2,3,0],
    "Solo":             [3,5,2,3,5,0,0,4,5,4,5,5,5,3,0,4,0,5,0,0,0,0,5],
    "Coopération":      [0,0,2,0,0,0,5,0,0,0,2,2,0,0,0,0,0,2,2,0,0,0,0],
    "Batailles":        [1,0,1,2,2,0,2,0,0,0,0,0,0,0,4,0,2,0,0,4,0,4,0],
    "Graphismes":       [4,0,0,1,0,0,0,0,0,0,0,0,0,3,0,4,3,0,0,0,2,0,3],
    "Gestion":          [0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,1,0,0],
    "Histoire":         [3,0,0,0,1,0,0,0,0,0,3,0,0,0,0,5,3,0,0,0,2,0,9],
    "Historique":       [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    "Bac à sable":      [1,0,0,0,0,0,0,0,0,0,0,0,3,3,1,0,0,4,0,1,0,1,0],
    "Mobile":           [0,2,2,0,0,0,0,0,3,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
    "Multijoueur":      [0,0,4,4,0,0,5,0,0,0,0,0,5,5,5,0,5,0,4,5,2,5,0],
    "1ère personne":    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,5,0,0,0,0,0,0],
    "Jeux de stratégie":[0,0,2,0,0,0,0,0,0,0,0,0,0,0,9,0,0,3,0,9,0,9,0],
    "Tir":              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,9,0,2,0,2,0,0],
    "Survie":           [3,0,0,2,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0],
    "Relaxant":         [0,4,4,0,0,3,0,5,5,2,5,3,5,3,0,0,0,4,1,0,0,0,4],
    "Sci-Fi/Fantasy":   [0,0,0,1,1,0,2,0,0,1,0,0,0,0,3,0,0,0,0,3,0,3,1]
}
const genres_type ={
    0:'Adventure',
    1:'Arcade',
    2:'Card & Board Game',
    3:'Fighting',
    4:"Hack and slash/Beat 'em up",
    5:'Indie',
    6:'MOBA',
    7:'Music',
    8:'Pinball',
    9:'Platform',
    10:'Point-and-click',
    11:'Puzzle',
    12:'Quiz/Trivia',
    13:'Racing',
    14:'Real Time Strategy (RTS)',
    15:'Role-playing (RPG)',
    16:'Shooter',
    17:'Simulator',
    18:'Sport',
    19:'Strategy',
    20:'Tactical',
    21:'Turn-based strategy (TBS)',
    22:'Visual Novel'
}

// Il existe pleins de mots clés, on a router.post, router.get...
router.post('/', async (req, res) => {
    const data = req.body;
    let notes = Array(23);
    
    //calcul des notes de chaque genre pour cette personne en se basant sur son graphe de statistiques
    for (let i = 0; i < 23; i++ ) {
        let temp_somme = 0
        for (let j = 0; j<21; j++){
            temp_somme += matrice[data.stats[j].category][i]*data.stats[j].score;
        }
        notes[i] = temp_somme;
    }

    let tempmax = [0,0,0];
    let max_index = [0,0,0];
    
    //trouver les index des trois meilleurs genres pour cette personnes à partir des notes calculées avant
    for (let i = 0; i < notes.length; i++) {
        if (notes[i] > tempmax[0]) {
          let temp1 = tempmax[0]
          let temp2 = tempmax[1];
          tempmax[0] = notes[i];
          tempmax[1] = temp1;
          tempmax[2] = temp2;
          temp1 = max_index[0]
          temp2 = max_index[1];
          max_index[0] = i;
          max_index[1] = temp1;
          max_index[2] = temp2;
        } else if (notes[i] > tempmax[1]) {
          let temp2 = tempmax[1];
          tempmax[1] = notes[i];
          tempmax[2] = temp2;
          temp2 = max_index[1];
          max_index[1] = i;
          max_index[2] = temp2;
        } else if (notes[i] > tempmax[2]) {
          tempmax[2] = notes[i];
          max_index[2] = i;
        }
    }
    
    let search_words = genres_type[max_index[0]] + " " + genres_type[max_index[1]] + " " + genres_type[max_index[2]];
    
    games_db.collection.createIndex({
        "genres": "text"
    })

    
    //aller chercher dans la database les jeux qui correspondent le plus aux critères de l'utilisateur
    const games = await games_db.find({$text:{$search:search_words}}, {name:1,cover_url:1,rating:1}).sort({rating:-1}).limit(10)
    if (games){
        res.status(201).json(games);
    }else{
        res.status(401).json("erreur: jeux idéal non trouvé");
    }
})
module.exports = router;