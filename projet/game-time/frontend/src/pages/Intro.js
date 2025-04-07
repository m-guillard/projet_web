import { useState, useEffect } from "react";
import { useRef } from "react";
import "../styles/Intro.css";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";

export default function IntroPage({ onClose }) {
    const [finalResults, setFinalResults] = useState([]);
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [finished, setFinished] = useState(false);
    const hasBeenSaved = useRef(false);


    const games = {
        "The Sims": ["Gestion"],
        "Minecraft": ["Bac à sable", "Multijoueur", "1ère personne", "Exploration", "Survie"],
        "Candy Crush": ["Mobile", "Relaxant"],
        "Call of Duty": ["1ère personne", "Tir", "Violent", "Batailles"],
        "Civilization": ["Jeux de stratégie", "Historique"],
        "Dark Souls": ["Difficulté", "Histoire", "Batailles"],
        "Stardew Valley": ["Gestion", "Relaxant", "Coopération", "Bac à sable"],
        "League of Legends": ["Dynamique", "Coopération", "Batailles"],
        "Red Dead Redemption": ["Histoire", "Historique", "1ère personne", "Exploration"],
        "Animal Crossing": ["Relaxant", "Animaux mignons", "Bac à sable"],
        "Fortnite": ["Tir", "Batailles", "Multijoueur", "Survie"],
        "The Witcher 3": ["Histoire", "Exploration", "Batailles"],
        "PUBG": ["Tir", "1ère personne", "Batailles", "Survie"],
        "Assassin's Creed": ["Historique", "Exploration", "Batailles"]
      };

    const questions = [
        { text: "Préfères-tu planifier avant d’agir ?", category: "Jeux de stratégie" },
        { text: "Aimes-tu l’immersion des jeux solo ?", category: "Solo" },
        { text: "Est-ce que ça te dérange de recommencer plusieurs fois pour réussir ?", category: "Difficulté" },
        { text: "Tu apprécies les jeux d’action nerveux ?", category: "Dynamique" },
        { text: "Préféres-tu les jeux avec une histoire profonde ?", category: "Histoire" },
        { text: "Tu joues rarement en multijoueur ?", category: "Solo" },
        { text: "L’esthétique influence-t-elle tes choix de jeux ?", category: "Graphismes" },
        { text: "Aimes-tu les défis difficiles ?", category: "Difficulté" },
        { text: "L’histoire d’un jeu est-elle essentielle pour toi ?", category: "Histoire" },
        { text: "Aimes-tu les jeux de gestion de ressources ?", category: "Jeux de stratégie" },
        // { text: "Tu préfères jouer seul ?", category: "Solo" },
        // { text: "Tu apprécies les jeux exigeants ?", category: "Difficulté" },
        // { text: "Aimes-tu les jeux narratifs ?", category: "Histoire" },
        // { text: "Aimes-tu les jeux de gestion et de simulation ?", category: "Gestion" },
        // { text: "Aimes-tu les jeux de stratégie ?", category: "Jeux de stratégie" },
        // { text: "Les graphismes sont-ils importants pour toi ?", category: "Graphismes" },
        // { text: "Tu préfères des jeux sans pression ?", category: "Relaxant" },
        // { text: "Aimes-tu les jeux historiques ?", category: "Historique" },
        // { text: "Aimes-tu les jeux de tir ?", category: "Tir" },
        // { text: "Aimes-tu les jeux colorés et tranquilles ?", category: "Animaux mignons" },
        // { text: "Tu préfères les jeux de science-fiction ou de fantasy ?", category: "Sci-Fi/Fantasy" },
        // { text: "Les jeux demandant des réflexes rapides te plaisent-ils ?", category: "Dynamique" },
        // { text: "Tu apprécies optimiser et gérer des systèmes ?", category: "Gestion" },
        // { text: "Tu apprécies les jeux avec une ambiance relaxante ?", category: "Relaxant" },
        // { text: "Aimes-tu les jeux en coopération ?", category: "Coopération" },
        // { text: "Aimes-tu les jeux à la première personne ?", category: "1ère personne" },
        // { text: "Es-tu fan des jeux de chats ou d’animaux mignons ?", category: "Animaux mignons" },
        // { text: "Aimes-tu les jeux bac à sable ?", category: "Bac à sable" },
        // { text: "Aimes-tu les jeux violents ?", category: "Violent" },
        // { text: "Aimes-tu les jeux avec de guerre/batailles ?", category: "Batailles" },
        // { text: "Aimes-tu les jeux d'exploration ?", category: "Exploration" },
        // { text: "Aimes-tu les univers futuristes ?", category: "Sci-Fi/Fantasy" },
        // { text: "Aimes-tu les jeux rapides et dynamiques ?", category: "Dynamique" },
        // { text: "Aimes-tu les jeux de survie ?", category: "Survie" },
        // { text: "Joues-tu souvent à des jeux mobiles ?", category: "Mobile" },
        ...Object.entries(games).map(([game, categories]) => (
            { text: `Aimes-tu les jeux du type ${game} ? (passe si jamais joué)`, category: categories }
        )).flat()
    ];

    const handleAnswer = (answer) => {
        const categories = Array.isArray(questions[step].category) ? questions[step].category : [questions[step].category];
        setAnswers((prev) => {
            let updatedAnswers = { ...prev };
            categories.forEach(category => {
                updatedAnswers[category] = [...(prev[category] || []), answer === "Oui" ? 1 : answer === "Neutre" ? 0.5 : answer === "Non" ? 0 : null].filter((v) => v !== null);
            });
            return updatedAnswers;
        });

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setFinished(true);
        }
    };

    useEffect(() => {
        const savedResults = Cookies.get("GT_profilStats");
        if (savedResults) {
            try {
                const parsedResults = JSON.parse(savedResults);
                if (Array.isArray(parsedResults) && parsedResults.every(r => r.category && typeof r.score === "number")) {
                    setFinalResults(parsedResults);
                    setFinished(true);
                }
            } catch (error) {
                console.error("Erreur lors du parsing des résultats:", error);
            }
        }
    }, []);

    useEffect(() => {
        if (finished && Object.keys(answers).length > 0 && !hasBeenSaved.current){
          const results = computeResults(answers);
          saveResultsToCookies(results);
      
          const sendData = async () => {
            try {
              await sendResultsToBackend(results);
            } catch (error) {
              console.error("Erreur lors de l'envoi des résultats :", error);
            }
            setFinalResults(results);
          };
      
          sendData();
          hasBeenSaved.current = true;
        }
    }, [finished, answers]);

    const computeResults = (answers) => {
        const results = Object.keys(answers).map(category => {
            const values = answers[category];
            const average = values.reduce((acc, v) => acc + v, 0) / values.length;
            return { category, score: average };
        });
    
        // On trie pour l'affichage, si besoin
        return results.sort((a, b) => b.score - a.score);
    };
    
    const saveResultsToCookies = (results) => {
        Cookies.set("GT_profilStats", JSON.stringify(results), { expires: 7 });
    };

    const sendResultsToBackend = async (results) => {
        try {
            const response = await fetch("http://localhost:5000/intro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(results),
            });

            const data = await response.json();
            console.log("Réponse du backend :", data);
        } catch (error) {
            console.error("Erreur lors de l'envoi des résultats :", error);
        }
    };

    const resetProfile = () => {
        Cookies.remove("GT_profilStats");
        setStep(0);
        setFinished(false);
        setAnswers({});
    };

    return (
        <div className="intro-container">
            <Link to="/">
                <button className="btn_croix">X</button>
            </Link>

            {!finished ? (
                <>
                    <img src="/Nino_t.png" alt="Logo" className="character" />
                    <div className="question-box">
                        <h2>{questions[step].text}</h2>
                        <div className="buttons">
                            {["Oui", "Non", "Neutre", "Passe"].map((option) => (
                                <button key={option} onClick={() => handleAnswer(option)}>
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div className="results-container">
                    <h2>Voici ton profil de joueur :</h2>
                    {finalResults.length > 0 ? (
                        <ResponsiveContainer width={800} height={600}>
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={finalResults}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="category" tick={{ fontSize: 18 }} radius={5} angle={0} />
                                <Radar name="Profil" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                            </RadarChart>
                        </ResponsiveContainer>
                    ) : (
                        <p>Chargement des résultats...</p>
                    )}
                </div>
            )}
            {finished && <button onClick={resetProfile}>Refaire le test</button>}
        </div>
    );
}
