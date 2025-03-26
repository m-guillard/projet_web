import "../styles/Accueil.css";
import { Link } from 'react-router-dom';  // Importation de Link pour la navigation
import Header from "../pages/Header";  // Importation du bandeau Header du haut

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

        <Link to="/login">
          <button className="btn">INSCRIPTION | CONNEXION</button>
        </Link>
      </section>

      <section className="games-section">
        <h2>🎮 Jeux les mieux notés</h2>
        <div className="games-grid">
          <div className="game-card"></div>
          <div className="game-card"></div>
          <div className="game-card"></div>
        </div>

        <h2>✨ À découvrir</h2>
        <div className="games-grid">
          <div className="game-card"></div>
          <div className="game-card"></div>
          <div className="game-card"></div>
        </div>

        <h2>🔥 Jeux tendance</h2>
        <div className="games-grid">
          <div className="game-card"></div>
          <div className="game-card"></div>
          <div className="game-card"></div>
        </div>
      </section>

      <footer className="footer">
        Saluuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuut
      </footer>
    </div>
  );
};

export default App;
