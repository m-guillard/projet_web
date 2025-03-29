import "../styles/profile.css";
import { Avatar, TextField} from '@mui/material';
import Header from "./Header";

function Profile(){
    return(<div id="fenetre">
        <Header/>
        <div class="presentation">
            <div class="avatar">
                <Avatar sx={{width:"20vw",height:"20vw",margin:"10vw 10vw 2vw 10vw"}}/>
                avatar
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
            </div>
        </div>
    </div>)
}

export default Profile;