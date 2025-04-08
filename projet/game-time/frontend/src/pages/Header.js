// Header.js
import { Link } from 'react-router-dom';
import "../styles/Header.css";  // Importation du fichier CSS spécifique au header
import Cookies from "js-cookie";
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

const Header = ({genre}) => {
  const isAuthenticated = Cookies.get("authTrueGameTime");
  const [value, setValue] = useState("");
  const [submit,setSubmit] = useState(0);

  function handleSearch(){
    setSubmit(1);
  }

  return (
    submit?<Navigate to="/Search" state={{value:value}} replace={true}/>:
    <header className={`header ${genre}`}>
      <div className="logo">
      <Link to="/">
        <img src="/Nini_qui_game.png" alt="Logo" />
      </Link>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <form className="container_search" onSubmit={handleSearch}>
          <input type="text" value={value} onChange={(e) => {setValue(e.target.value);}} placeholder=" Recherche..." className="search"/>
        </form>
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