import "../styles/Cardgame.css"
import { Card, CardMedia, Fab, Typography } from "@mui/material";
import { useState } from "react";
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';


const Card_Game = () => {
    const [index, setIndex] = useState(0);
    const contents = ["yo1","yo2","yo3","yo4","yo5","yo6","yo7","yo8","yo9","yo10"]
    const nmb_len_total_cards = contents.length;

    const Arrow = ({direction, handleClick}) => {
        return(
        <Fab style={{alignSelf:"center",background:"transparent"}} onClick={handleClick}>
            {direction === "left" ? <ArrowBackIos fontSize="10vw"/> : <ArrowForwardIos fontSize="10vw"/>}
        </Fab>
        )
    }

    const ArrowClick = (direction) => {
        const increment = direction === "left" ? -1 : 1;
        const newIndex = (index + increment + nmb_len_total_cards) % nmb_len_total_cards;
        setIndex(newIndex);
    }
    
    return(
        <div className="games-grid">
            <Arrow direction={"left"} handleClick={() => ArrowClick("left")}/>
                <Card sx={{width:"10vw",height:"10vw"}}>
                    <CardMedia src="">
                        <Typography>{contents[index]}</Typography>
                    </CardMedia>
                </Card>
                <Card sx={{width:"10vw",height:"10vw"}}>
                    <CardMedia src="">
                        <Typography>{contents[(index+1)%nmb_len_total_cards]}</Typography>
                    </CardMedia>
                </Card>
                <Card className="game-card">
                    <CardMedia component="img" src={"https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"} />
                    <Typography sx={{position:"relative", top:"-5vw", color:"#ffffff"}}>{contents[(index+2)%nmb_len_total_cards]}</Typography>
                </Card>
            <Arrow direction={"right"} handleClick={() => ArrowClick("right")}/>
        </div>
    )
}

export default Card_Game;