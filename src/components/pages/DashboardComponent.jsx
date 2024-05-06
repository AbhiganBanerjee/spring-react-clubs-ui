//This component will contain the nav-bar of all the nations, and will show the temas in body

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import FilterComponent from "../filter/FilterCoponent";
import axios from "axios";
import {AccountCircle, Logout, SportsSoccer } from "@mui/icons-material";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import ClubCardsComponent from "../filter/ClubCardsComponent";
import ResponsiveCards from "../filter/ResponsiveCards";

const DashboardComponent = ()=>{
    //create a cookie reference to check for existing cookies
    const[cookie,setCookie,removeCookie] = useCookies();

    //create navigate ref for navigation when required
    let navigate = useNavigate();

    //create a nation reference 
    let nation = "";

    //Create a user reference to store user details from Cookie
    const[user,setUser] = useState('');

    //Create a Reference to hold the all clubs jsonArray, array of JSONs, each json a club
    const[clubs,setClubs] = useState([{}]);

    //Create a reference to set the trophies, which is an array of array
    const[trophies,setTrophies] = useState([[]]);

    //Create a reference to set the legends array of array
    const[legends,setLegends] = useState([[]]);

    //Create a method to load the Clubs from Spring Backend REST API
    const loadClubs = (url)=>{
        //it will GET the clubs from the url
        axios.get(url)
        .then((res)=>{
            setClubs(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    //Create a method to load the trophies from the Spring Backend REST API
    const loadTrophies = (url)=>{
        //it will GET the trophies array from the url
        axios.get(url)
        .then((res)=>{
            setTrophies(res.data);
            console.log(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    //Create a method to load the legends from the Spring Backend REST API
    const loadLegends = (url)=>{
        //it will GET the legends array from the url
        axios.get(url)
        .then((res)=>{
            setLegends(res.data);
            console.log(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    //Create one Dialog for Without Login Access to Dashboard
    //Manager States and methods for it
    const[errDialogOpen,setErrDialogOpen] = useState(false);
    const handleErrDialogOpen = ()=>{
        setErrDialogOpen(true);
    }
    const handleErrDialogClose = ()=>{
        setErrDialogOpen(false);
    }
    const ErrDialog = ()=>{
        return(
            <Dialog open={errDialogOpen} onClose={handleErrDialogClose}>
                <DialogTitle className="font-monospace fw-bolder fs-5 text-white text-bg-danger">Error</DialogTitle>
                <DialogContent className="mt-3 font-monospace fw-bolder fs-6 text-danger">Login First, then access Dashboard!! Navigating to Login Page wait..</DialogContent>
                <DialogActions>
                    <Button onClick={handleErrDialogClose} className="fs-6 font-monoscape fw-bolder" size="small" variant="contained" color="error">Ok</Button>
                </DialogActions>
            </Dialog>
        )
    }

    useEffect(()=>{
        //On Component mount first check if cookie with userName name exists or not
        if(cookie["userName"]){
            //Cookie exists then set the user variable
            setUser(cookie["userName"]);

            //On Component-mount it will load the club details based on the props
            //Load all the products at first
            loadClubs(`https://spring-react-football.onrender.com/getTeams?nation=all`);

            //Load all the trophies also at first
            loadTrophies(`https://spring-react-football.onrender.com/getTrophies?nation=all`);

            //Load all the legends also at first
            loadLegends(`https://spring-react-football.onrender.com/getLegends?nation=all`);
        }else{
            //cookie is not ther give err msg in an Error Model
            handleErrDialogOpen();

            //Give a delay and navigate back to login
            setTimeout(()=>{
                //cookie is not present, so can not allow for dashboard page redirect to login
                navigate("/home/login");
            },3600)
        }
    },[]);

    //Handle the filterChange, on filter Change only load the particular nation clubs
    const handleFilterChange = (e)=>{
        //set the nation
        nation = e.target.value;

        //load the clubs based on the nation 
        loadClubs(`https://spring-react-football.onrender.com/getTeams?nation=${nation}`);

        //load the trophies also based on the nation 
        loadTrophies(`https://spring-react-football.onrender.com/getTrophies?nation=${nation}`);

        //load the legends also based on the nation 
        loadLegends(`https://spring-react-football.onrender.com/getLegends?nation=${nation}`);
    }

    //Create a Success Dialog that will be displayed on success log out
    const[dialogOpen,setDialogOpen] = useState(false);
    const handleDialogOpen = ()=>{
        setDialogOpen(true);
    }
    const handleDialogClose = ()=>{
        setDialogOpen(false);
    }
    const SuccessDialog = ()=>{
        return(
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle className="font-monospace fw-bolder fs-5 text-bg-warning">Sign Out</DialogTitle>
                <DialogContent className="mt-3 font-monospace fw-bolder fs-6 text-danger">Signed Out Successfully...</DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} className="fs-6 font-monoscape fw-bolder" size="small" variant="contained" color="error">Ok</Button>
                </DialogActions>
            </Dialog>
        )
    }

    //on Sign out click remove the existing cookie and logout
    const handleSignOut = ()=>{
        //remove the cookie with "userName" nae
        removeCookie("userName");

        //give an alert msg in the success model
        handleDialogOpen();

        //navigate back to login page after some delay
        setTimeout(()=>{
            navigate("/home/login");
        },1000)
    }

    //return the markup or presentation
    return(
        <div className="container-fluid">
            <header className="text-center" style={{border:"3px solid white"}}>
                <h3 className="fw-bold font-monospace text-white"><SportsSoccer/> Football Clubs Dashboard Page dashboard<br/>
                    <div className="text-center">
                        <AccountCircle/><b className="fs-6">{user} &nbsp; | &nbsp; Sign Out<IconButton onClick={handleSignOut} size="small" color="inherit"><Logout/></IconButton></b> 
                    </div>
                </h3>
            </header>
            <section className="row">
                <nav className="col-2">
                    {/* Access the FilterComponent here to have the drop-down */}
                    <FilterComponent onChange={handleFilterChange}/>
                </nav>
                <main className="mt-2">
                    {/* <ClubCardsComponent clubs={clubs} trophies={trophies} legends={legends}/> */}
                    <ResponsiveCards clubs={clubs} trophies={trophies} legends={legends}/>
                </main>
            </section>
            {/* Give the Dialogs */}
            <SuccessDialog/>
            <ErrDialog/>
        </div>
    )
}

//export the component
export default DashboardComponent;