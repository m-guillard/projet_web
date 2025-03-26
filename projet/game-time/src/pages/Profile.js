import "../styles/profile.css";
import { Avatar} from '@mui/material';
import Header from "./Header";

function Profile(){
    return(<div id="fenetre">
        <Header/>
        <Avatar sx={{width:"30vw",height:"30vw",margin:"10vw"}}/>
    </div>)
}

export default Profile;