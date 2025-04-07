// Header.js
import { Link } from 'react-router-dom';
import "../styles/Header.css";  // Importation du fichier CSS spécifique au header

const Header = ({genre}) => {
  return (
    <header className={`header ${genre}`}>
      <div className="logo">🎮</div>
      <nav>
        <Link to="/">Home</Link>
        <input type="text" placeholder="Recherche..." className="search" />
        <Link to="/intro">
          <button className="btn">INSCRIPTION | CONNEXION</button>
        </Link>
        <a href="/Profile" className="profile">Profil</a>
      </nav>
    </header>
  );
};

export default Header;