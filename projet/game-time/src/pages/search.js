import React from 'react';
import "../styles/search.css";
import { useState } from 'react';


function Bar(){
    const [value, setValue] = useState("");
    return(<input type="text" placeholder="Search.."/>)
}

function ThemeBox ({nom}){
    return (<button>{nom}</button>);
}

export default function Search() {
    return (<div id="search">
                <div class="navbar">
                    <span>Home</span>
                    <span>Recherche :</span>
                </div>

                <div class="searchbar">
                    <h1>Recherche</h1>
                    <input type="text" placeholder="Search.."/>
                </div>

        </div>
    )
}
