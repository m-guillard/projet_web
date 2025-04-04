import "../styles/login.css";
import { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Champ({nom, valeur, onChange, type_champ="text", mdp=""}){
    return (
    <ul>
        <li><label>{nom}</label></li>
        { mdp==="inscr" && <li className="precision">(Entre 8 et 50 caract., 1 chiffre min., 1 caract. spécial min., 1 majuscule min., 1 minuscule min.)</li>}
        <li><input type={type_champ} value={valeur} onChange={onChange}/></li>
        { mdp==="conn" && <li className="oubli"><a href="https://google.com">Mot de passe oublié</a></li>}
     </ul>)
}

function Titre({nom}){
    return(<h3>{nom}</h3>)
}

function Erreur({erreur}){
    return(<h2 className="erreur">{erreur}</h2>)
}

function Bouton({nom}){
    return(<input type="submit" name={nom} />)
}

function Login(){
    const navigate = useNavigate();
    const [passwordInsc, setPasswordInsc] = useState("");
    const [usernameInsc, setUsernameInsc] = useState("");
    const [passwordConn, setPasswordConn] = useState("");
    const [usernameConn, setUsernameConn] = useState("");
    const [mail, setMail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [verifPassword, setVerifPassword] = useState("");
    const [erreurInscr, setErreurInscr] = useState("");
    const [erreurConn, setErreurConn] = useState("");

    // Gestion connexion
    const handleSubmitConnexion = async (e) => {
        e.preventDefault();

        const rep = await fetch('http://localhost:5000/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"page":'connexion',usernameConn, passwordConn}),
        });
        const data = await rep.json();
        console.log("Reponse du serveur :", data);

        if(rep.ok) {
            navigate("/profile");
        } else {
            //const data = await rep.json();
            console.log("Erreur", data);
            setErreurConn(data.message);
        }
    };

    // Gestion inscription
    const handleSubmitInscription = async (e) => {
        e.preventDefault();

        const rep = await fetch('http://localhost:5000/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"page":'inscription',
                usernameInsc, mail, birthday, passwordInsc, verifPassword}),
        });
        const data = await rep.json();
        console.log("Reponse du serveur :", data);

        if(rep.ok) {
            console.log("All is good");
            navigate("/profile");
        } else {
            // const data = await rep.json;
            console.log("Erreur", data);
            setErreurInscr(data.message);
        }
    };
    return(<div id="page_login">
    <Header />
    <div id="fenetre_login">
        <div className="formulaire">
            <Titre nom={"Connexion"} />
            <Erreur erreur={erreurConn} />
            <form onSubmit={handleSubmitConnexion}>
                <Champ nom={"Nom d'utilisateur"} valeur={usernameConn} onChange={(e) => setUsernameConn(e.target.value)} />
                <Champ nom={"Mot de passe"} mdp={"conn"} type_champ="password" valeur={passwordConn} onChange={(e) => setPasswordConn(e.target.value)}/>
                <Bouton nom={"Se connecter"} />
            </form>
        </div>
        <div className="separator"></div>
        <div className="formulaire">
            <Titre nom={"Inscription"} />
            <Erreur erreur={erreurInscr} />
            <form onSubmit={handleSubmitInscription}>
                <Champ nom={"Nom d'utilisateur *"} valeur={usernameInsc} onChange={(e) => setUsernameInsc(e.target.value)}/>
                <Champ nom={"Mail *"} type_champ="email" valeur={mail} onChange={(e) => setMail(e.target.value)}/>
                <Champ nom={"Date de naissance *"} type_champ="date" valeur={birthday} onChange={(e) => setBirthday(e.target.value)}/>
                <Champ nom={"Mot de passe *"} mdp={"inscr"} type_champ="password" valeur={passwordInsc} onChange={(e) => setPasswordInsc(e.target.value)}/>
                <Champ nom={"Confirmation du mot de passe *"} type_champ="password" valeur={verifPassword} onChange={(e) => setVerifPassword(e.target.value)}/>
                <Bouton nom={"S'inscrire"} />
            </form>
        </div>
        </div>
    </div>)
}

export default Login;

