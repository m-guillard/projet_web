import "../styles/profile.css";
import { Avatar, TextField} from '@mui/material';
import Header from "./Header";

function Profile(){
    return(<div id="fenetre">
        <Header/>
        <div class="presentation">
            <div class="avatar">
                <Avatar sx={{width:"20vw",height:"20vw",margin:"10vw 10vw 2vw 10vw"}}/>
                azer
            </div>
            <div class="infos">
                <h2 id="titreinfos">
                    Informations:
                </h2>
            </div>
        </div>
    </div>)
}

export default Profile;