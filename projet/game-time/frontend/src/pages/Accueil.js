import "../styles/Accueil.css";
import { Link } from 'react-router-dom';  // Importation de Link pour la navigation
import Header from "./Header";  // Importation du bandeau Header du haut
import Card_Game from "./Cardgame";
import Footer from "./Footer";

const App = () => {
  return (
    <div className="container">
      <Header />

      <section className="hero">
        <h1>Rejoignez la plus grande communauté de fans de jeux vidéo au monde</h1>
        <p className="subtext">- non c'est toujours pas pompé sur TVTime</p>
        <ul> 
          <li>Gardez une trace des jeux auxquels vous avez joué</li>
          <li>Ayez une idée du temps passé à jouer grâce à notre compteur intégré</li>
          <li>Accédez aux jeux à la une, pour savoir à quoi jouer ensuite</li>
          <li>Personnalisez votre profil, et découvrez ceux des autres gamers</li>
          <li>bla bla bla bla bla bla bla</li>
        </ul>

        
        <div className="character-container">
          <Link to="/intro">
          <img src="/Nino_t.png" alt="Logo" className="character_accueil" />
          <div className="bubble">Clique-moi dessus pour générer tes statistiques de profil ! Ça permettra de te créer un profil, ou si tu l'as déjà fait, de te suggérer des jeux de manière personnalisée.</div>
          </Link>        
        </div>
        

      
      </section>

      <section className="games-section">
        <h2>🎮 Jeux les mieux notés</h2>
        <Card_Game type={"note"} page={"accueil"}/>
        <h2>✨ À découvrir</h2>
        <Card_Game type={"découverte"} page={"accueil"}/>
        <h2>🔥 Jeux tendance</h2>
        <Card_Game type={"tendances"} page={"accueil"}/>
      </section>

      <Footer />
    </div>
  );
};

export default App;
