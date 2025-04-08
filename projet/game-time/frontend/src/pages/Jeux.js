import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import "../styles/jeux.css";
import Footer from "./Footer";

const Jeux = () => {
    const location = useLocation();
    const [game, setGame] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Récupérer le nom du jeu depuis l'état de navigation
    const gameName = location.state?.gameName || "";

    const handleSubmitJeux = async () => {
        if (!gameName) {
            setError("Aucun nom de jeu fourni");
            setLoading(false);
            return;
        }
        
        try {
            console.log("Recherche du jeu:", gameName);
            const rep = await fetch('http://localhost:5000/fetchGames', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "gameName": gameName }),
            });

            if (rep.ok) {
                const gameData = await rep.json();
                console.log("Données du jeu reçues:", gameData);
                setGame(gameData);
            } else {
                const errorData = await rep.json();
                setError(`Échec: ${errorData.error || rep.statusText}`);
            }
        } catch (err) {
            setError(`Erreur lors de la récupération des données: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return "Date inconnue";
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString("fr-FR");
    };

    useEffect(() => {
        handleSubmitJeux();
    }, [gameName]); // Ajouter gameName comme dépendance pour relancer la requête si elle change

    if (loading) return (
        <div>
            <Header />
            <div className="loading">Chargement...</div>
            <Footer />
        </div>
    );
    
    if (error) return (
        <div>
            <Header />
            <div className="error">Erreur : {error}</div>
            <Footer />
        </div>
    );

    if (!game) return (
        <div>
            <Header />
            <div className="error">Aucune information trouvée pour ce jeu</div>
            <Footer />
        </div>
    );

    return (
        <div>
            <Header />
            <div className="card">
                {game.cover_url ? (
                    <img src={game.cover_url} alt={game.name} />
                ) : (
                    <p>Couverture non disponible</p>
                )}
                <h2>{game.name}</h2>
                <p><strong>Description :</strong> {game.summary || "Aucune description disponible"}</p>
                <p><strong>Date de sortie :</strong> {formatDate(game.first_release_date)}</p>
                {game.platforms && Array.isArray(game.platforms) ? (
                    <p><strong>Plateformes :</strong> {game.platforms.join(", ")}</p>
                ) : (
                    <p><strong>Plateformes :</strong> Information non disponible</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Jeux;