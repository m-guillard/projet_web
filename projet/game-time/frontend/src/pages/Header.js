// Header.js
import { Link } from 'react-router-dom';
import "../styles/Header.css";  // Importation du fichier CSS spécifique au header
import Cookies from "js-cookie";

const isAuthenticated = Cookies.get("authTrueGameTime");

const Header = ({genre}) => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/Nini_qui_game.png" alt="Logo" />
      </div>
      <nav>
        <Link to="/">Home</Link>
        <input type="text" placeholder=" Recherche..." className="search" />

        {isAuthenticated ? (
          <Link to="/Profile">Profil</Link>
        ) : (
          <Link to="/login">Connexion | Inscription</Link>
        )}

      </nav>
    </header>
  );
};

export default Header;