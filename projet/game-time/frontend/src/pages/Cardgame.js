import "../styles/Cardgame.css"
import { Card, CardMedia, Fab, Typography } from "@mui/material";
import { useEffect,useState } from "react";
import Cookies from 'js-cookie';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

const Card_Game = ({type,page}) => {

    const [index, setIndex] = useState(0);
    const [games,setGames] = useState([]);
    const [content,setContent] = useState([]);
    const navigate = useNavigate();
    const nmb_len_total_cards = 10;

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
      
    useEffect(() => {
        async function getGames(){
            // Récupérer les résultats enregistrés dans les cookies ou à partir du backend
            let savedResults = Cookies.get("GT_profilStats");
            if (savedResults) {
                try {
                    const parsedResults = JSON.parse(savedResults);

                    // Vérifier que les données sont sous forme d'un tableau avec la structure attendue
                    if (Array.isArray(parsedResults) && parsedResults.every(r => r.category && typeof r.score === "number")) {
                        savedResults = parsedResults;
                    }
                } catch (error) {
                    console.error("Erreur lors du parsing des résultats:", error);
                }
            }
            const rep = await fetch('http://localhost:5000/ProfileGames', {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({"stats":savedResults}),
            });
            const res = await rep.json();
            console.log(res);
            if (rep.ok){
                setContent(res);
            }
        }
        if (type == "Personnalisé"){
            getGames();
        }
    }, [type]);


    useEffect(() => {
        const fetchGames = async () => {
            try {
                const rep = await fetch('http://localhost:5000/accueil', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({type}) 
                });
    
                const data = await rep.json();
                setGames(data);
            } catch (err) {
                console.error("Erreur API:", err);
            }
        };
    
        fetchGames();
    }, [type]);

    if (games.length>0 && page=="accueil"){
    return(
        <div className="games-grid">
            <Arrow direction={"left"} handleClick={() => ArrowClick("left")}/>
                <Card className="game-card" onClick={() => navigate("/Jeux", { state: { gameName: games[index].name } })} sx={{borderRadius:"2vw"}} >
                    <CardMedia component="img" src={games[index].cover_url} />
                    <Typography sx={{position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", color:"#ffffff", backdropFilter:"blur(2px)", borderRadius:"0.4vw", backgroundColor:"#00000055"}}>{games[index].title}</Typography>
                </Card>
                <Card className="game-card midcard" onClick={() => navigate("/Jeux", { state: { gameName: games[(index+1)%nmb_len_total_cards].name } })} sx={{borderRadius:"2vw"}}>
                    <CardMedia component="img" src={games[(index+1)%nmb_len_total_cards].cover_url} />
                    <Typography sx={{position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", color:"#ffffff", backdropFilter:"blur(2px)", borderRadius:"0.4vw", backgroundColor:"#00000055"}}>{games[(index+1)%nmb_len_total_cards].title}</Typography>
                </Card>
                <Card className="game-card lastcard" onClick={() => navigate("/Jeux", { state: { gameName: games[(index+2)%nmb_len_total_cards].name } })} sx={{borderRadius:"2vw"}}>
                    <CardMedia component="img" src={games[(index+2)%nmb_len_total_cards].cover_url} />
                    <Typography sx={{position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", color:"#ffffff", backdropFilter:"blur(2px)", borderRadius:"0.4vw", backgroundColor:"#00000055"}}>{games[(index+2)%nmb_len_total_cards].title}</Typography>
                </Card>
            <Arrow direction={"right"} handleClick={() => ArrowClick("right")}/>
        </div>
    )}
    if (content.length>0 && page=="profile"){       
    return(
        <div className="games-grid">
            <Arrow direction={"left"} handleClick={() => ArrowClick("left")}/>
                <Card className="game-card" onClick={() => navigate("/Jeux", { state: { gameName: games[index].name } })} sx={{borderRadius:"2vw"}} >
                    <CardMedia component="img" src={content[index].cover_url} />
                    <Typography sx={{position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", color:"#ffffff", backdropFilter:"blur(2px)", borderRadius:"0.4vw", backgroundColor:"#00000055"}}>{content[index].name}</Typography>
                </Card>
                <Card className="game-card midcard" onClick={() => navigate("/Jeux", { state: { gameName: games[(index+1)%nmb_len_total_cards].name } })} sx={{borderRadius:"2vw"}}>
                    <CardMedia component="img" src={content[(index+1)%nmb_len_total_cards].cover_url} />
                    <Typography sx={{position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", color:"#ffffff", backdropFilter:"blur(2px)", borderRadius:"0.4vw", backgroundColor:"#00000055"}}>{content[(index+1)%nmb_len_total_cards].name}</Typography>
                </Card>
                <Card className="game-card lastcard" onClick={() => navigate("/Jeux", { state: { gameName: games[(index+2)%nmb_len_total_cards].name } })} sx={{borderRadius:"2vw"}}>
                    <CardMedia component="img" src={content[(index+2)%nmb_len_total_cards].cover_url} />
                    <Typography sx={{position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", color:"#ffffff", backdropFilter:"blur(2px)", borderRadius:"0.4vw", backgroundColor:"#00000055"}}>{content[(index+2)%nmb_len_total_cards].name}</Typography>
                </Card>
            <Arrow direction={"right"} handleClick={() => ArrowClick("right")}/>
        </div>
    )}
}

export default Card_Game;