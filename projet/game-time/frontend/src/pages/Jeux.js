import { useEffect, useState } from "react";
import Header from "./Header";
import "../styles/jeux.css";
import Footer from "./Footer";

const Jeux = () => {
    const [game, setGame] = useState(null);
    const [error, setError] = useState(null);

    //var games = await games_db.find({name: new RegExp(data.value, "i")});
    //res.json(games)

    const handleSubmitJeux = async () => {
        try {
            const rep = await fetch('http://localhost:5000/fetchGames', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "gameName": "Warframe" }),
            });

            if (rep.ok) {
                const gameData = await rep.json();
                console.log(gameData); // Vérifiez la structure des données reçues
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
                {game.cover_url ? (
                    <img src={game.cover_url.replace("t_thumb","t_1080p")} alt={game.name} />
                ) : (
                    <p>Couverture non disponible</p>
                )}
                <h2>{game.name}</h2>
                <p><strong>Description :</strong> {game.summary || "Aucune description disponible"}</p>
                <p><strong>Date de sortie :</strong> {formatDate(game.first_release_date)}</p>
                <p><strong>Plateformes :</strong>{game.platforms.join(", ")}</p>
            </div>
            <Footer />
        </div>
    );
};

export default Jeux;
