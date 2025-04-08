import "../styles/profile.css";
import Cookies from 'js-cookie';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';  // Importation de Link pour la navigation
import Header from "./Header";
import Card_Game from "./Cardgame";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Profile() {
    const navigate = useNavigate();
    const [finalResults, setFinalResults] = useState([]);
    const [avatar, setAvatar] = useState('');
    const [datenaissance, setDatenaissance] = useState('');
    const [mail,setMail] = useState('');

    useEffect(() => {
        // Récupérer les résultats enregistrés dans les cookies ou à partir du backend
        const savedResults = Cookies.get("GT_profilStats");
        if (savedResults) {
            try {
                const parsedResults = JSON.parse(savedResults);
                // Vérifier que les données sont sous forme d'un tableau avec la structure attendue
                if (Array.isArray(parsedResults) && parsedResults.every(r => r.category && typeof r.score === "number")) {
                    setFinalResults(parsedResults);
                }
            } catch (error) {
                console.error("Erreur lors du parsing des résultats:", error);
            }
        }
    }, []);

    const handleDeconnexion = async (e) => {
        Cookies.remove('authTrueGameTime');
        navigate('/Login');
    };

    const getinfo = async () => {
        const data = Cookies.get('authTrueGameTime');
        const rep = await fetch('http://localhost:5000/fetchProfile', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"id":data}),
        });
        const res = await rep.json();
        if (rep.ok){
            setAvatar(res.avatar);
            setDatenaissance(res.datenaissance);
            setMail(res.mail);
        }else{
            // handleDeconnexion();
        }
    };
    
    getinfo();

    return(<div id="fenetre">
        <Header/>
        <div className="presentation">
            <div className="avatar">
                <Avatar sx={{width:"calc(14px + 20vw)",height:"calc(14px + 20vw)"}}/>
                <p>
                    {avatar}
                </p>
            </div>
            <div className="avatar2">
                <Avatar sx={{width:"calc(30px + 40vw)",height:"calc(30px + 40vw)"}}/>
                <p>
                    {avatar}
                </p>
            </div>
            <div className="infos">
                <h2 id="titreinfos">
                    Informations:
                </h2>
                <p className="birthdate">
                    {datenaissance}
                </p>
                <p className="email">
                    {mail}
                </p>
                <Link to="/">
                    <button className="btndeconnexion" onClick={handleDeconnexion}>DECONNEXION</button>
                </Link>
            </div>
        </div>
        <section className="profile-graph-section">
            <h2>🎯 Ton profil de joueur</h2>
            {finalResults.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={finalResults}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="category" tick={{ fontSize: 14 }} radius={5} angle={0} />
                        <Radar name="Profil" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    </RadarChart>
                </ResponsiveContainer>
            ) : (
                <p>Chargement des résultats...</p>
            )}
        </section>
        <section className="games-section">
            <h2>🎮 Jeux préférés</h2>
            <Card_Game type={"note"}/>
            <h2>✨ Jeux pour toi</h2>
            <Card_Game type={"découverte"}/>
            <h2>🔥 Jeux récemments joués</h2>
            <Card_Game type={"tendances"}/>
        </section>
    </div>)
}

export default Profile;
