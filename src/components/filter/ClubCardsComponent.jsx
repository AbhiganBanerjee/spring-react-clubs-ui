import {DarkMode, EmojiEvents, LightMode, MilitaryTech} from "@mui/icons-material";
import { Avatar, Card, CardContent, CardHeader, CardMedia, Container, CssBaseline, IconButton} from "@mui/material";
import { useEffect, useState } from "react";

const ClubCardsComponent = ({clubs, trophies, legends})=>{

    //Define a custom style object for the cards
    const[myStyle,setMyStyle] = useState({});

    //Create a state for theme changing of card
    const[isTheme,setIsTheme] = useState(true);

    //method for changing theme
    const themeChange = ()=>{
        //Toogle the themeState
        setIsTheme(!isTheme);

        //set the style of the card
        setMyStyle({
            backgroundColor : !isTheme ? "white" : "#063C18",
            color : !isTheme ? "#063C18" : "white",
            border: isTheme ? "3px solid white" : "3px solid #063C18",
            width: "calc(45% - 16px)", 
            margin: "20px" 
        });
    }

    //on the component mount also define the styles for the card
    useEffect(()=>{
        setMyStyle({
            backgroundColor : isTheme ? "white" : "#063C18",
            color : isTheme ? "#063C18" : "white",
            border: !isTheme ? "3px solid white" : "3px solid #063C18",
            width: "calc(45% - 16px)", 
            margin: "20px" 
        });
    },[])


    return(
        <div className="container-fluid">
            <CssBaseline/>
            <Container maxWidth="lg" className="overflow-auto d-flex flex-wrap justify-content-center">
                {/* For each club create a card */}
                {
                    clubs.map((club,index) => 
                        <Card  elevation={8} style={myStyle} className="mt-2" key={club._id}>
                            {/* Create the CardHeader */}
                            <CardHeader 
                                avatar={
                                    <Avatar style={{border:!isTheme?"2px solid white" : "2px solid #063C18"}} src={club.legLogo} />
                                }
                                action={
                                    <IconButton color="inherit" onClick={themeChange}>
                                        {isTheme?<DarkMode/> : <LightMode/>}
                                    </IconButton>
                                }
                                title = {
                                    <b className="fw-bold font-monospace fs-5">{club.name} [ESTD: {club.estd}]</b>
                                }
                            />
                            {/* Make the Card Body */}
                            <CardContent className="card-body font-monospace">
                                <dl>
                                    {/* Print the trophies */}
                                    <dt><EmojiEvents/> Trophies:</dt>
                                    <dd>
                                        {
                                            //Print each of the trophy details seperated by comma delimeter
                                            trophies && trophies[index] && Array.isArray(trophies[index]) && (
                                                <p>{trophies[index].join(", ")}</p>
                                            )
                                        }
                                    </dd>
                                    {/* Print the Legends name */}
                                    <dt><MilitaryTech/> Icons:</dt>
                                    <dd>
                                        {
                                            //Print the legends name seperated by comma delimeter
                                            legends && legends[index] && Array.isArray(legends[index]) && (
                                                <p>{legends[index].join(", ")}</p>
                                            )
                                        }
                                    </dd>
                                </dl>
                                {/* Put the Image of the Club */}
                                <CardMedia
                                    component="img"
                                    image={club.image}
                                    height={300}
                                    width={300}
                                    style={{border:!isTheme?"3px solid white" : "3px solid #063C18"}}
                                />
                            </CardContent>
                        </Card>
                    )
                }
            </Container>
        </div>
    )
}

export default ClubCardsComponent;