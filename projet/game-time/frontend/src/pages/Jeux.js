import { useEffect, useState } from "react";
import Header from "./Header";
import "../styles/jeux.css";

const Jeux = () => {
    const [game, setGame] = useState(null);
    const [error, setError] = useState(null);

    // Gestion connexion
    const handleSubmitJeux = async () => {
try {
    const rep = await fetch('http://localhost:5000/fetchGames', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"gameName" : "Hatsune Miku: Project Diva Arcade"}),
    });

    if(rep.ok) {
        const gameData = await rep.json();
        setGame(gameData);
    } else {
        const errorData = await rep.json();
        setError(`Échec: ${errorData.error || rep.statusText}`);
    }
} catch (err) {
    setError(`Erreur lors de la récupération des données: ${err.message}`);
}
};


    const formatDate = (timestamp) => {
        if (!timestamp) return "Date inconnue";
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString("fr-FR");
    };

    useEffect(() => {
        handleSubmitJeux();
    }, []);

    if (error) return <p>Erreur : {error}</p>;
    if (!game) return <p>Chargement...</p>;

    return (
        <div>
            <Header />
            <div className="card">
                <img src={game.cover?.url.replace("t_thumb", "t_cover_big")} alt={game.name} />
                <h2>{game.name}</h2>
                <p><strong>Description :</strong> {game.summary || "Aucune description disponible"}</p>
                <p><strong>Date de sortie :</strong> {formatDate(game.first_release_date)}</p>
                <div className="platforms">
                    {game.platforms?.map((p, index) => (
                        <img key={index} src={`../../backend/database/plateformes/${p.name.toLowerCase()}.svg`} alt={p.name} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Jeux;
