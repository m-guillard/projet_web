import { useState } from "react";
import "../styles/Intro.css";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Link } from 'react-router-dom';

export default function IntroPage({ onClose }) {

    const games = {
        "The Sims": ["Gestion"],
        "Minecraft": ["Bac à sable", "Multijoueur", "1ère personne", "Exploration", "Survie"],
        "Candy Crush": ["Mobile"],
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
    { text: "Aimes-tu les jeux de stratégie ?", category: "Jeux de stratégie" },
    { text: "Préfères-tu planifier avant d’agir ?", category: "Jeux de stratégie" },
    { text: "Aimes-tu les jeux de gestion de ressources ?", category: "Jeux de stratégie" },
    { text: "Tu préfères jouer seul ?", category: "Solo" },
    { text: "Aimes-tu l’immersion des jeux solo ?", category: "Solo" },
    { text: "Tu joues rarement en multijoueur ?", category: "Solo" },
    { text: "Les graphismes sont-ils importants pour toi ?", category: "Graphismes" },
    { text: "Préféres-tu les jeux réalistes ?", category: "Graphismes" },
    { text: "L’esthétique influence-t-elle tes choix de jeux ?", category: "Graphismes" },
    { text: "Aimes-tu les défis difficiles ?", category: "Difficulté" },
    { text: "Tu apprécies les jeux exigeants ?", category: "Difficulté" },
    { text: "Aimes-tu recommencer plusieurs fois pour réussir ?", category: "Difficulté" },
    { text: "Préféres-tu les jeux avec une histoire profonde ?", category: "Histoire" },
    { text: "L’histoire d’un jeu est-elle essentielle pour toi ?", category: "Histoire" },
    { text: "Aimes-tu les jeux narratifs ?", category: "Histoire" },
    { text: "Aimes-tu les jeux de gestion et de simulation ?", category: "Gestion" },
    { text: "Les jeux de simulation t’intéressent-ils ?", category: "Gestion" },
    { text: "Tu apprécies optimiser et gérer des systèmes ?", category: "Gestion" },
    { text: "Tu apprécies les jeux avec une ambiance relaxante ?", category: "Relaxant" },
    { text: "Aimes-tu les jeux zen et apaisants ?", category: "Relaxant" },
    { text: "Tu préfères des jeux sans pression ?", category: "Relaxant" },
    { text: "Es-tu fan des jeux de chats ou d’animaux mignons ?", category: "Animaux mignons" },
    { text: "Aimes-tu les jeux colorés et tranquilles ?", category: "Animaux mignons" },
    { text: "Les jeux avec des mascottes t’attirent-ils ?", category: "Animaux mignons" },
    { text: "Tu préfères les jeux de science-fiction ou de fantasy ?", category: "Sci-Fi/Fantasy" },
    { text: "Aimes-tu les univers futuristes ?", category: "Sci-Fi/Fantasy" },
    { text: "Les mondes fantastiques t’attirent-ils ?", category: "Sci-Fi/Fantasy" },
    { text: "Aimes-tu les jeux rapides et dynamiques ?", category: "Dynamique" },
    { text: "Tu apprécies les jeux d’action nerveux ?", category: "Dynamique" },
    { text: "Les jeux demandant des réflexes rapides te plaisent-ils ?", category: "Dynamique" },
    { text: "Aimes-tu les jeux de stratégie ?", category: "Jeux de stratégie" },
    { text: "Aimes-tu les jeux de gestion ?", category: "Gestion" },
    { text: "Aimes-tu les jeux relaxants ?", category: "Relaxant" },
    { text: "Tu préfères les jeux solo ?", category: "Solo" },
    { text: "Aimes-tu les jeux avec une histoire profonde ?", category: "Histoire" },
    { text: "Aimes-tu les jeux en coopération ?", category: "Coopération" },
    { text: "Aimes-tu les jeux à la première personne ?", category: "1ère personne" },
    { text: "Aimes-tu les jeux bac à sable ?", category: "Bac à sable" },
    { text: "Aimes-tu les jeux violents ?", category: "Violent" },
    { text: "Aimes-tu les jeux historiques ?", category: "Historique" },
    { text: "Aimes-tu les jeux de tir ?", category: "Tir" },
    { text: "Aimes-tu les jeux avec de grandes batailles ?", category: "Batailles" },
    { text: "Aimes-tu les jeux d'exploration ?", category: "Exploration" },
    { text: "Aimes-tu les jeux de survie ?", category: "Survie" },
    { text: "Joues-tu souvent à des jeux mobiles ?", category: "Mobile" },
    ...Object.entries(games).map(([game, categories]) => (
        { text: `Aimes-tu les jeux du type ${game} ? (passe si jamais joué)`, category: categories }
      )).flat()
    ];

    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [finished, setFinished] = useState(false);

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

    const resultsData = Object.keys(answers).map((category) => {
        const values = answers[category];
        const score = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
        return { category, score };
    });

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
                <ResponsiveContainer width={800} height={600}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={resultsData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" tick={{ fontSize: 18 }} radius={5} angle={0}/>
                    <Radar name="Profil" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    </RadarChart>
                    
                </ResponsiveContainer>
                </div>
            )}
        </div>
    );
    }
  
