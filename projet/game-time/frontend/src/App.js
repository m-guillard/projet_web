import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Import des éléments nécessaires
import Accueil from './pages/Accueil';  // Page Accueil
import Login from './pages/Login';  // Page Login
import Profile from './pages/Profile';
import Jeux from './pages/Jeux';  // Page Jeux
import Search from './pages/search';
import Intro from './pages/Intro'
import Theme from './pages/Theme';
import './App.css';

function App() {
  return (
    <Router> {/* Encapsule l'application avec BrowserRouter */}
      <div>
        <Routes>
          <Route path="/" element={<Accueil />} />  {/* Route pour la page d'accueil */}
          <Route path="/login" element={<Login />} />  {/* Route pour la page Login */}
          <Route path="/profile" element={<Profile />}/> {/*Route pour la page de profile*/}
          <Route path="/Jeux" element={<Jeux />} />  {/*Route pour la page Jeux*/}
          <Route path="/intro" element={<Intro />}/> {/*Route pour la page de profile*/}
          <Route path="/Search" element={<Search />} />  {/*Route pour la page Search*/}
          <Route path="/Theme/:genre" element={<Theme />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
