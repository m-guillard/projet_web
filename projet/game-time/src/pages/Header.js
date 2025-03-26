// Header.js
import { Link } from 'react-router-dom';
import "../styles/Header.css";  // Importation du fichier CSS spécifique au header

const Header = () => {
  return (
    <header className="header">
      <div className="logo">🎮</div>
      <nav>
        <Link to="/">Home</Link>
        <input type="text" placeholder="Recherche..." className="search" />
        <a href="#" className="profile">Profil</a>
      </nav>
    </header>
  );
};

export default Header;