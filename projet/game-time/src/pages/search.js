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
                if(e.target.value===""){
                  setSearchShow(false);
                }
                else {
                  setSearchShow(true);
                }
              }}/>
            <div>
              {search()}
            </div>
        </div>
        
    </div>
    )
}
