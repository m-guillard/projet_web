import "../styles/theme.css";
//import { Link } from 'react-router-dom';  // Importation de Link pour la navigation
import Header from "./Header";  // Importation du bandeau Header du haut
import Card_Game from "./Cardgame";
import { useParams } from 'react-router-dom';
import Footer from "./Footer";


export default function Theme (){
    const {genre}=useParams();

    return(
        <div className={`theme-container ${genre}`}>
            <Header genre={genre}/>
            <div className={`title-theme ${genre}`}>
                <h1>{genre.toUpperCase()}</h1>
            </div>

            <section className="games-section">
            <h2>🎮 Jeux les mieux notés</h2>
            <Card_Game type={"note"}/>
            <h2>✨ À découvrir</h2>
            <Card_Game type={"découverte"}/>
            <h2>🔥 Jeux tendance</h2>
            <Card_Game type={"tendances"}/>
            </section>

            <Footer />
      </div>
    )
}