import { useEffect, useState } from "react";

const GameList = () => {
    const [games, setGames] = useState([]);
    const CLIENT_ID = "9azw30noybrs4gmw1wrpdiifeoehxr";
    const ACCESS_TOKEN = "8rf4655zbmd4cijtia98l0dk1edprt";

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch("https://api.igdb.com/v4/games", {
                method: "POST",
                headers: {
                    "Client-ID": CLIENT_ID,
                    "Authorization": `Bearer ${ACCESS_TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: `fields name, cover.url, platforms.name, summary, first_release_date;
                       limit 20; 
                       sort first_release_date desc;`
            });

            const data = await response.json();
            setGames(data);
        };

        fetchGames();
    }, []);

    const formatDate = (timestamp) => {
        if (!timestamp) return "Date inconnue";
        const date = new Date(timestamp * 1000); // Convertir en millisecondes
        return date.toLocaleDateString("fr-FR"); // Format : jj/mm/aaaa
    };

    return (
        <div className="game-list">
            {games.map(game => (
                <div key={game.id} className="game-card">
                    <img src={game.cover?.url.replace("t_thumb", "t_cover_big")} alt={game.name} />
                    <h2>{game.name}</h2>
                    <p><strong>Date de sortie :</strong> {formatDate(game.first_release_date)}</p>
                    <p>{game.summary}</p>
                    <p><strong>Plateformes :</strong> {game.platforms?.map(p => p.name).join(", ")}</p>
                </div>
            ))}
        </div>
    );
};

export default GameList;
