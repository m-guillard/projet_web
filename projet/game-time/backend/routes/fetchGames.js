export const fetchGames = async (gameName) => {
    const CLIENT_ID = "9azw30noybrs4gmw1wrpdiifeoehxr";
    const ACCESS_TOKEN = "rpcgns0s8hzjd4hd5ks763seblmuye";

    try {
        const response = await fetch("https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games", {
            method: "POST",
            headers: {
                "Client-ID": CLIENT_ID,
                "Authorization": `Bearer ${ACCESS_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: `search "${gameName}"; fields name, cover.url, platforms.name, summary, first_release_date; limit 1;`
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data && data.length > 0) {
            return data[0];
        } else {
            throw new Error("No data found");
        }
    } catch (error) {
        console.error("Error fetching games:", error);
        throw error;
    }
};