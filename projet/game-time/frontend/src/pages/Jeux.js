/*
import "../styles/jeux.css";
//import { Link } from 'react-router-dom';  // Uncomment if you need navigation
// id : 9azw30noybrs4gmw1wrpdiifeoehxr
// key : 8rf4655zbmd4cijtia98l0dk1edprt 
// POST: https://id.twitch.tv/oauth2/token?client_id=9azw30noybrs4gmw1wrpdiifeoehxr&client_secret=8rf4655zbmd4cijtia98l0dk1edprt&grant_type=client_credentials

//{"access_token":"8qotuugsp84pg5p6ot3outu89l8no3","expires_in":5110356,"token_type":"bearer"}


const App = () => {
  return (
    <div>
      
      <div className="card">
        <img src="bd/l_jeux/Destiny 2/Destiny_2.jpg" alt="Destiny 2" />
        <h2>Destiny 2</h2>
        <p>Description du jeu : il est trop bien</p>
        <p><strong>Note :</strong> <span className="note">★★★★★</span></p>
        <p><strong>Commentaires :</strong></p>
        <p>Michel : Le jeu est bof</p>
        <p>Pedro : banger</p>
        <p><strong>Plateformes :</strong></p>
        <div className="plateformes">
          <img src="bd/plateformes/playstation.svg" alt="PlayStation" />
          <img src="bd/plateformes/steam.svg" alt="Steam" />
          <img src="bd/plateformes/xbox.svg" alt="Xbox" />
        </div>
      </div>
    </div>
  );
};

export default App;
*/

import { useEffect, useState } from "react";
import { fetchGameByName } from "../../server/database/fetchGames";
import "../styles/jeux.css";

const App = () => {
    const [game, setGame] = useState(null); // Stocke les infos du jeu

    useEffect(() => {
        const loadGame = async () => {
            const gameData = await fetchGameByName("Destiny 2"); // Récupère Destiny 2
            setGame(gameData);
        };

        loadGame();
    }, []);

    const formatDate = (timestamp) => {
        if (!timestamp) return "Date inconnue";
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString("fr-FR");
    };

    if (!game) return <p>Chargement...</p>;

    return (
        <div>
            <div className="card">
                <img src={game.cover?.url.replace("t_thumb", "t_cover_big")} alt={game.name} />
                <h2>{game.name}</h2>
                <p><strong>Description :</strong> {game.summary || "Aucune description disponible"}</p>
                <p><strong>Date de sortie :</strong> {formatDate(game.first_release_date)}</p>
                <p><strong>Plateformes :</strong> {game.platforms?.map(p => p.name).join(", ") || "Non disponible"}</p>
            </div>
        </div>
    );
};

export default App;
