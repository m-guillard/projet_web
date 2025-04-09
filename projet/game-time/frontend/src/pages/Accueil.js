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
        <h1>Rejoins la plus grande communauté de fans de jeux vidéo au monde</h1>
        <p className="subtext">Et trouve le jeu qui reflète l'état de ton âme 🙂 </p>
        <ul> 
          <li>Génère ton profil personnalisé grâce à notre monstrueux questionnaire</li>
          <li>A partir de ce profil, nous te générons un jeu auquel tu n'as pas encore joué, qui te correspond !</li>
          <li>Accède aux jeux à la une, suivant les critères de ton choix</li>
          <li>Garde une trace des jeux auxquels tu as joué, et laisse ton avis pour les autres joueurs !</li>
          <li>Personnalise ton profil, et découvre ceux des autres gamers</li>
          <li>Découvre des informations sur les jeux qui t'intéressent</li>
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
