import React from 'react';
import "../styles/search.css";
import { useState } from 'react';


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
    ///const [suggestions, setSuggestions] = useState([]);
    const filteredgame = datagame.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    const filteredprofil = dataprofil.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    function search(){
      if (searchShow){
        return(<Scroll>
          <Searchlist person={filteredprofil} games={filteredgame}/>
        </Scroll>);
      }
      return null;
    }

    function theme(){
      if(!searchShow){
        return(
          <div class="theme-container">
          <div class="themebox" style={{ backgroundColor: "lightblue" }}>
            <p>HORROR</p>
          </div>
          <div class="themebox" style={{ backgroundColor: "red" }}>
            <p>ACTION</p>
          </div>
          <div class="themebox" style={{ backgroundColor: "yellow" }}>
            <p>AVENTURE</p>
          </div>
          <div class="themebox" style={{ backgroundColor: "lightblue" }}>
            <p>RPG</p>
          </div>
          <div class="themebox" style={{ backgroundColor: "red"}}>
            <p>SANDBOX</p>
          </div>
          <div class="themebox" style={{ backgroundColor: "yellow" }}>
            <p>FPS</p>
          </div>
          <div class="themebox" style={{ backgroundColor: "lightblue" }}>
            <p>MOBA</p>
          </div>
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
          </div>
          <div class="game-container">
            <Searchlist person={filteredprofil} games={filteredgame}/>
          </div>
        </div>)
      }
    }

    function handleSearch(){
      if(value===""){
        setSearchShow(false);
      }
      else {
        setSearchShow(true);
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

        <div>
          {theme()}
        </div>

        <div>
          {result()}
        </div>      
    </div>
    )
}

/*<div>
    {search()}
  </div>*/
