import "../styles/profile.css";
import {Avatar, IconButton} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Header from "./Header";

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
                    <IconButton sx={{position:"relative"}}>
                        <SettingsIcon fontSize="large"/>
                    </IconButton>
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
            </div>
        </div>
    </div>)
}

export default Profile;