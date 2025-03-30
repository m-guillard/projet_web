import "../styles/login.css";
import { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";


function Champ({nom, valeur, onChange, type_champ="text", mdp=false}){
    return (
    <ul>
        <li><label>{nom}</label></li>
        <li><input type={type_champ} value={valeur} onChange={onChange}/></li>
        { mdp && <li className="oubli"><a href="https://google.com">Mot de passe oublié</a></li>}
     </ul>)
}

function Titre({nom}){
    return(<h3>{nom}</h3>)
}

function Bouton({nom}){
    return(<input type="submit" name={nom} />)
}

function Login(){
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    // Gestion connexion
    const handleSubmitConnexion = async (e) => {
        e.preventDefault();

        const rep = await fetch('http://localhost:5000/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password}),
        });
        const data = await rep.json();
        console.log("Reponse du serveur :", data);

        if(rep.ok) {
            navigate("/profile");
        } else {
            alert("Echec");
        }
    };
    return(<div id="page_login">
    <Header />
    <div id="fenetre_login">
        <div className="formulaire">
            <Titre nom={"Connexion"} />
            <form onSubmit={handleSubmitConnexion}>
                <Champ nom={"Nom d'utilisateur"} valeur={username} onChange={(e) => setUsername(e.target.value)} />
                <Champ nom={"Mot de passe"} mdp={true} type_champ="password" valeur={password} onChange={(e) => setPassword(e.target.value)}/>
                <Bouton nom={"Se connecter"} />
            </form>
        </div>
        <div className="separator"></div>
        <div className="formulaire">
            <Titre nom={"Inscription"} />
            <form method="POST" action="http://localhost:5000/login">
                <Champ nom={"Nom d'utilisateur"} />
                <Champ nom={"Mail"} type_champ="email"/>
                <Champ nom={"Date de naissance"} type_champ="date" />
                <Champ nom={"Mot de passe"} type_champ="password" />
                <Champ nom={"Confirmation du mot de passe"} type_champ="password" />
                <Bouton nom={"S'inscrire"} />
            </form>
        </div>
        </div>
    </div>)
}

export default Login;

