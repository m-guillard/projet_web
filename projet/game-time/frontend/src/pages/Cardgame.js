import "../styles/Cardgame.css"
import { Card, CardMedia, Fab, Typography } from "@mui/material";
import { useState } from "react";
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';


const Card_Game = (type) => {
    const [index, setIndex] = useState(0);

    //faire demande de contents en backend dépendant du type qu'on veut:
    const contents = [
        {title:"yo1akihfdajhe",
        imgsrc:"https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"},
        {title:"yo2",
        imgsrc:"https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80"},
        {title:"yo3",
        imgsrc:"https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80"},
        {title:"destiny",
        imgsrc:"https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80"},
        {title:"yo5",
        imgsrc:null},
        {title:"yo6",
        imgsrc:null},
        {title:"yo7",
        imgsrc:null},
        {title:"yo8",
        imgsrc:null},
        {title:"yo9",
        imgsrc:null},
        {title:"yo10",
        imgsrc:null}
    ];
    const nmb_len_total_cards = contents.length;

    const Arrow = ({direction, handleClick}) => {
        return(
        <Fab style={{alignSelf:"center",background:"transparent",width:"calc(20px + 5vw)",height:"calc(20px + 5vw)",minHeight:"0"}} onClick={handleClick}>
            {direction === "left" ? <ArrowForwardIos sx={{fontSize:"calc(5px + 4vw)",transform:"rotate(180deg)"}}/> : <ArrowForwardIos style={{fontSize:"calc(5px + 4vw)"}}/>}
        </Fab>
        )
    }

    const ArrowClick = (direction) => {
        const increment = direction === "left" ? -1 : 1;
        const newIndex = (index + increment + nmb_len_total_cards) % nmb_len_total_cards;
        setIndex(newIndex);
    }

    const CardClick = (content) =>{
        const {imgsrc, title} = content;
        console.log(title);
    }
    
    return(
        <div className="games-grid">
            <Arrow direction={"left"} handleClick={() => ArrowClick("left")}/>
                <Card className="game-card" onClick={() => CardClick(contents[index])} sx={{borderRadius:"2vw"}} >
                    <CardMedia component="img" src={contents[index].imgsrc} />
                    <Typography sx={{position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", color:"#ffffff", backdropFilter:"blur(2px)", borderRadius:"0.4vw"}}>{contents[index].title}</Typography>
                </Card>
                <Card className="game-card midcard" onClick={() => CardClick(contents[(index+1)%nmb_len_total_cards])} sx={{borderRadius:"2vw"}}>
                    <CardMedia component="img" src={contents[(index+1)%nmb_len_total_cards].imgsrc} />
                    <Typography sx={{position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", color:"#ffffff", backdropFilter:"blur(2px)", borderRadius:"0.4vw"}}>{contents[(index+1)%nmb_len_total_cards].title}</Typography>
                </Card>
                <Card className="game-card lastcard" onClick={() => CardClick(contents[(index+2)%nmb_len_total_cards])} sx={{borderRadius:"2vw"}}>
                    <CardMedia component="img" src={contents[(index+2)%nmb_len_total_cards].imgsrc} />
                    <Typography sx={{position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", color:"#ffffff", backdropFilter:"blur(2px)", borderRadius:"0.4vw"}}>{contents[(index+2)%nmb_len_total_cards].title}</Typography>
                </Card>
            <Arrow direction={"right"} handleClick={() => ArrowClick("right")}/>
        </div>
    )
}

export default Card_Game;