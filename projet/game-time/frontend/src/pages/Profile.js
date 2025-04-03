import "../styles/profile.css";
import {Avatar, IconButton} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Header from "./Header";
import Card_Game from "./Cardgame";


function Profile(){
    return(<div id="fenetre">
        <Header/>
        <div class="presentation">
            <div class="avatar">
                <Avatar src="../logo.svg" sx={{width:"calc(14px + 20vw)",height:"calc(14px + 20vw)"}}/>
                <p>
                    avatar
                </p>
            </div>
            <div class="avatar2">
                <Avatar src="../logo.svg" sx={{width:"calc(30px + 40vw)",height:"calc(30px + 40vw)"}}/>
                <p>
                    avatar
                </p>
            </div>
            <div class="infos">
                <h2 id="titreinfos">
                    Informations:
                </h2>
                <p class="name">
                    Robin JENNY
                </p>
                <p class="birthdate">
                    10/04/2005
                </p>
                <p class="email">
                    robinjenny73@gmail.com
                </p>
                <IconButton sx={{position:"absolute", top:"0", right:"0"}}>
                    <SettingsIcon fontSize="large"/>
                </IconButton>
            </div>
        </div>
        <section className="games-section">
            <h2>🎮 Jeux préférés</h2>
            <Card_Game type={"note"}/>
            <h2>✨ Jeux pour toi</h2>
            <Card_Game type={"découverte"}/>
            <h2>🔥 Jeux récemments joués</h2>
            <Card_Game type={"tendances"}/>
        </section>
    </div>)
}

export default Profile;