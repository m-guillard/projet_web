// import { useEffect, useState } from "react";
// import { fetchGames } from "../fetchGames";
// import Header from "./Header";
// import "../styles/jeux.css";

// const Jeux = () => {
//     const [game, setGame] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const loadGame = async () => {
//             try {
//                 const gameData = await fetchGames("Destiny 2");
//                 console.log("Game Data:", gameData);
//                 setGame(gameData);
//             } catch (err) {
//                 console.error("Error fetching game data:", err);
//                 setError(err.message);
//             }
//         };

//         loadGame();
//     }, []);

//     const formatDate = (timestamp) => {
//         if (!timestamp) return "Date inconnue";
//         const date = new Date(timestamp * 1000);
//         return date.toLocaleDateString("fr-FR");
//     };

//     if (error) return <p>Erreur : {error}</p>;
//     if (!game) return <p>Chargement...</p>;

//     return (
//         <div>
//             <Header />
//             <div className="card">
//                 <img src={game.cover?.url.replace("t_thumb", "t_cover_big")} alt={game.name} />
//                 <h2>{game.name}</h2>
//                 <p><strong>Description :</strong> {game.summary || "Aucune description disponible"}</p>
//                 <p><strong>Date de sortie :</strong> {formatDate(game.first_release_date)}</p>
//                 <div className="platforms">
//                     {game.platforms?.map((p, index) => (
//                         <img key={index} src={`../../backend/database/plateformes/${p.name.toLowerCase()}.svg`} alt={p.name} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Jeux;