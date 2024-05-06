import {DarkMode, EmojiEvents, LightMode, MilitaryTech} from "@mui/icons-material";
import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, Container, CssBaseline, Grid, IconButton, Typography} from "@mui/material";
import { useEffect, useState } from "react";

const ResponsiveCards = ({clubs, trophies, legends})=>{

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
            margin: "20px" 
        });
    }

    //on the component mount also define the styles for the card
    useEffect(()=>{
        setMyStyle({
            backgroundColor : isTheme ? "white" : "#063C18",
            color : isTheme ? "#063C18" : "white",
            border: !isTheme ? "3px solid white" : "3px solid #063C18",
            margin: "20px" 
        });
    },[])


    return(
        // Parent Grid
        <div>
            <Grid container spacing={2}>
            {/* Child Grid iterating through the collection*/}
                {
                    clubs.map((club,index)=>
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card style={myStyle} sx={{ maxWidth: 445 }}>
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
                                        <b className="fw-bold font-monospace">{club.name}</b>
                                    }
                                    subheader = {
                                        <p className="fw-bold font-monospace" style={{color:isTheme?"#063C18" : "white"}} >ESTD: {club.estd}</p>
                                    }
                                />
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="240"
                                        image={club.image}
                                        alt="club_logo"
                                        style={{border:!isTheme?"2px solid white" : "2px solid #063C18"}}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            <EmojiEvents/> <span className="font-monospace fw-bold">Trophies</span>
                                        </Typography>
                                        <Typography variant="body2" color="inherit">
                                            {
                                                //Print each of the trophy details seperated by comma delimeter
                                                trophies && trophies[index] && Array.isArray(trophies[index]) && (
                                                    <p className="font-monospace">{trophies[index].join(", ")}</p>
                                                )
                                            }
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="div">
                                            <MilitaryTech/> <span className="font-monospace fw-bold">Legends</span>
                                        </Typography>
                                        <Typography variant="body2" color="inherit">
                                            {
                                                //Print the legends name seperated by comma delimeter
                                                legends && legends[index] && Array.isArray(legends[index]) && (
                                                    <p className="font-monospace">{legends[index].join(", ")}</p>
                                                )
                                            }
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                }
            </Grid>
        </div>
    )
}

export default ResponsiveCards;

{/* <Grid item xs={2} sm={4} md={4} key={index}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    height="140"
                                    image={club.image}
                                    alt="green iguana"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Lizard
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid> */}