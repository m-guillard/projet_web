import "../styles/profile.css";
import { Card, CardMedia } from '@mui/material';

function Profile(){
    return(<div>
        <header>INSERT HEADER FROM ALICE</header>
        <div type="presentation">
            {/* <Card> */}
                <CardMedia
                component="img"
                width="100"
                height="100"/>
            {/* </Card> */}
        </div>
    </div>)
}

export default Profile;