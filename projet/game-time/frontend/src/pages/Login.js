import "../styles/login.css";
import Header from "./Header";


function Champ({nom, type_champ="text", mdp=false}){
    return (
    <ul>
        <li><label>{nom}</label></li>
        <li><input type={type_champ}/></li>
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
    return(<div id="page_login">
    <Header />
    <div id="fenetre_login">
        <div className="formulaire">
            <Titre nom={"Connexion"} />
            <form action="" method="POST">
                <Champ nom={"Nom d'utilisateur"} />
                <Champ nom={"Mot de passe"} type_champ="password" />
                <Bouton nom={"Se connecter"} />
            </form>
        </div>
        <div className="separator"></div>
        <div className="formulaire">
            <Titre nom={"Inscription"} />
            <form action="" method="POST">
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

