import React from 'react';
import "../styles/search.css";
import { useState,useEffect } from 'react';


function Cardgame({game}){
  return(
    <div class="boxgame">
      <div>
        <h2>{game.name}</h2>
        <p>{game.genre}</p>
      </div>
    </div>
  );
}
function Cardprofil({profil}){
  return(
  <div class="boxgame">
      <div>
        <h2>{profil.name}</h2>
        <p>{profil.email}</p>
      </div>
    </div>);
}

function Searchlist({ person = [], games = [] }){
  const filtgame=games.map(game =>  <Cardgame key={game.id} game={game} />);
  const filtperson=person.map(profil =>  <Cardprofil key={profil.id} profil={profil} />);
  return(
    <div>
      <h3>🎮 Games</h3>
      {filtgame.length > 0 ? filtgame : <p>Aucun jeu trouvé.</p>}

      <h3>👤 Profils</h3>
      {filtperson.length > 0 ? filtperson : <p>Aucun profil trouvé.</p>}
    </div>
  )
}


const Scroll = (props) => {
  return( 
    <div class="scroll-menu">
      {props.children}
    </div>	
  );
}

export default function Search({datagame,dataprofil}) {
    const [value, setValue] = useState("");
    const [searchShow, setSearchShow] = useState(false);
    const themes =["Horror","Action","Adventure","RPG","Sandbox","FPS","MOBA"];
    const [selectedOptions, setSelectedOptions] = useState([]);

    const [filteredgame,setFilteredGames] =useState( datagame.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase()) ))
    const filteredprofil = dataprofil.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    
    useEffect(() => {
      let filtered = datagame.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
      if (selectedOptions.length > 0) {
        filtered = filtered.filter(item => selectedOptions.includes(item.genre));
      }
      setFilteredGames(filtered);
    }, [value, selectedOptions, datagame]);

    /*function search(){
      if (searchShow){
        return(<Scroll>
          <Searchlist person={filteredprofil} games={filteredgame}/>
        </Scroll>);
      }
      return null;
    }*/


    function handleSearch(){
      if(value===""){
        setSearchShow(false);
      }
      else {
        setSearchShow(true);
      }
    }

    function handleCheckboxChange(e) {
      const { value, checked } = e.target;
      setSelectedOptions(prev =>
        checked ? [...prev, value] : prev.filter(option => option !== value)
      );
    }

    function boxtheme(){
      if(!searchShow){
        return(
          <div class="theme-container">
          {themes.map((theme, index) => (
            <div key={index} className="themebox">
              <p>{theme}</p>
            </div>))}
        </div>
        )
      }
    }

    function result(){
      if (searchShow){
        return(
        <div class="result-container">
          <div class="filter-container">
            <h1>Filter</h1>
            <h2>Genres</h2>
            {themes.map((theme, index) => (
              <div key={theme}>
            <input 
            type="checkbox"
            name={theme}
            value={theme}
            checked={selectedOptions.includes(theme)}
            onChange={handleCheckboxChange}/>
            <label>{theme}</label>
            </div>))}
            
          </div>
          <div class="game-container">
            <Searchlist person={dataprofil} games={filteredgame} />
          </div>
        </div>)
      }
    }

    return (
    <div id="search">
        <div class="navbar">
            <span>Home</span>
            <span>Recherche :</span>
        </div>

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

/*<div>
    {search()}
  </div>*/
