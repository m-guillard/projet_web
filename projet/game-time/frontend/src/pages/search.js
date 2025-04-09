import React from 'react';
import "../styles/search.css";
import { useState,useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "./Header";  // Importation du bandeau Header du haut


function Cardgame({game}){
  const navigate = useNavigate(); 
  return(
    <button className="boxgame" onClick={() => navigate("/Jeux", { state: { gameName: game.name } })}>
      <div>
        <h2>{game.name}</h2>
        <p>{game.genres}</p>
      </div>
    </button>
  );
}

function Cardprofil({profil}){
  const navigate = useNavigate(); 
  return(
  <button class="boxgame" onClick={() => navigate("/profile")}>
      <div>
        <h2>{profil.username}</h2>
        <p>{profil.mail}</p>
      </div>
    </button>
   );
}

function Searchgame({ games = [] }){
  const filtgame=games.map(game =>  <Cardgame key={game.id} game={game} />);
  return(
    <div>
      <h3>🎮 Games</h3>
      {filtgame.length > 0 ? filtgame : <p>Aucun jeu trouvé.</p>}
    </div>
  )
}

function Searchprofil({ person = [] }){
  const filtperson=person.map(profil =>  <Cardprofil key={profil.id} profil={profil} />);
  return(
    <div>
      <h3>👤 Profils</h3>
      {filtperson.length > 0 ? filtperson : <p>Aucun profil trouvé.</p>}
    </div>
  )
}



export default function Search() {
    const location = useLocation();
    const valeur = location.state; //récupération de la valeur de recherche donnée par le header
    const [value, setValue] = useState("");
    useEffect(() => {setValue(valeur.value)},[valeur]); //actualisation de la valeur affichée et recherchée
    const [searchShow, setSearchShow] = useState(false);
    const themes =["horror","fighting","adventure","rpg","simulator","shooter","moba"];
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedType, setselectedType] = useState([]);
    const [filteredgame,setFilteredGames] =useState([]);
    const [filteredprofil,setFilteredProfil] = useState( []);
    const [rawgame, setRawgame] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
      let filtered = rawgame.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
      if (selectedOptions.length > 0) {
        filtered = filtered.filter(item => item.genres.some(type => selectedOptions.includes(type.toLowerCase())) );
      }
      setFilteredGames(filtered);
    }, [value, selectedOptions,rawgame]);

    const handleSubmitsearchprofile = async (e) => {
        //e.preventDefault();

        const rep = await fetch('http://localhost:5000/search', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"page":'profile',value}),
        });
        const data = await rep.json();
        console.log("Reponse du serveur :", data);

        if(rep.ok) {
            setFilteredProfil(data)
        } else {
            alert("Echec");
        }
    };

  const handleSubmitsearchgame = async (e) => {
      //e.preventDefault();

      const rep = await fetch('http://localhost:5000/search', {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({"page":'game',value}),
      });
      const data = await rep.json();
      console.log("Reponse du serveur :", data);

      if(rep.ok) {
          setRawgame(data)
      } else {
          alert("Echec");
      }
    };

    function handleSearch(){
      if(value===""){
        setSearchShow(false);
      }
      else {
        setSearchShow(true);
        handleSubmitsearchprofile();
        handleSubmitsearchgame();
      }
    }

    function handleCheckboxChangeGenre(e) {
      const { value, checked } = e.target;
      setSelectedOptions(prev =>
        checked ? [...prev, value] : prev.filter(option => option !== value)
      );
    }

    function handleCheckboxChangeType(e) {
      const { value, checked } = e.target;
      setselectedType(prev =>
        checked ? [...prev, value] : prev.filter(option => option !== value)
      );
    }

    function boxtheme(){
      if(!searchShow){
        return(
          <div class="theme-container">
          {themes.map((theme, index) => (
          <button key={index} className={`themebox ${theme}`} onClick={() => navigate(`/Theme/${theme}`)}>
            <div>
              <p>{theme.toUpperCase()}</p>
            </div>
          </button>
          ))}
        </div>
        )
      }
    }

    function gameprofil(){
      if (selectedType.includes("profil") && !selectedType.includes("game")){
          return(<div class="game-container">
            <Searchprofil  person={filteredprofil} />
            </div>
          );
      }else if(selectedType.includes("game") && !selectedType.includes("profil")){
        return(<div class="game-container">
          <Searchgame  games={filteredgame} />
        </div>);
      }else{
        return(<div class="game-container">
          <Searchgame  games={filteredgame} />
          <Searchprofil  person={filteredprofil} />
          </div>
        );
      }       
    }

    function result(){
      if (searchShow){
        return(
        <div class="result-container">
          <div class="filter-container">
            <h1>Filter</h1>
            <input 
              type="checkbox"
              name="profil"
              value="profil"
              checked={selectedType.includes("profil")}
              onChange={handleCheckboxChangeType}
              defaultChecked={true}/>
            <label>Profil</label>
            <input 
              type="checkbox"
              name="game"
              value="game"
              checked={selectedType.includes("game")}
              onChange={handleCheckboxChangeType}
              defaultChecked={true}/>
            <label>Game</label>
            <h2>Genres</h2>
            {themes.map((theme, index) => (
              <div key={theme}>
            <input 
              type="checkbox"
              name={theme}
              value={theme}
              checked={selectedOptions.includes(theme)}
              onChange={handleCheckboxChangeGenre}
              />
            <label>{theme.toUpperCase()}</label>
            </div>))}
            
          </div>
          {gameprofil()}          
        </div>)
      }
    }

    return (
    <div id="search">
        <Header/>

        <div class="searchbar">
            <h1 >Recherche</h1>
            <input type="text" 
              placeholder="Search.."
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}/>
              <button onClick={handleSearch} style={{ padding: '8px 16px' }}>
                Rechercher
              </button>
            
        </div>
          {boxtheme()}
          {result()}
    </div>
    )
}


