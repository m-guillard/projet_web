
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Import des éléments nécessaires
import Accueil from './pages/Accueil';  // Page Accueil
import Login from './pages/Login';  // Page Login (si elle existe)
import Profile from './pages/Profile';
import Jeux from './pages/Jeux';  // Page Jeux
import './App.css';

function App() {
  return (
    <Router> {/* Encapsule l'application avec BrowserRouter */}
      <div>
        <Routes>
          <Route path="/" element={<Accueil />} />  {/* Route pour la page d'accueil */}
          <Route path="/login" element={<Login />} />  {/* Route pour la page Login */}
          <Route path="/profile" element={<Profile />}/> {/*Route pour la page de profile*/}
          <Route path="/Jeux" element={<Jeux />} />  Route pour la page Login
        </Routes>
      </div>
    </Router>
  );
}

export default App;
