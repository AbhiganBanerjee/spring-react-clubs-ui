import { DarkMode, HowToReg, LightMode, Login } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Container, IconButton, TextField, Button } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const LoginComponent = ()=>{
    //Create a navigate reference to nagigate between pages
    let navigate = useNavigate();

    //Create a cookie reference to assign cookie for successfull login
    const[cookies,setCookies,removeCookie] = useCookies();

    //Create a formik reference to handle form info
    const formik = useFormik({
        initialValues:{
            userName : "",
            password : "",
        },
        onSubmit: values=>{
            //set a flag to indicate success or failure
            let flag = false;

            //Compare the username and password with registered users credentials
            //iterator through the users json array
            for(var user of users){
                if(user.userName == values.userName && user.password == values.password){
                    //User login valid
                    flag = true;

                    //set up the cookie
                    setCookies("userName",user.userName);

                    //give success message
                    alert("Login Success.. :)");

                    //navigate to Dashboard page
                    navigate("/dashboard");
                    break;
                }
            }
            if(!flag){
                //failed message
                alert("Login Failed!! :(");

                //navigate to error page
                navigate("/loginErr");
            }
        }
    });

    //define a style object for the card, and method to toggle card style
    const[isTheme,setIsTheme] = useState(true);
    const[cardStyle,setCardStyle] = useState({});
    
    const cardThemeClick = ()=>{
        //set the theme state
        setIsTheme(!isTheme);
        setCardStyle({ 
            backgroundColor : !isTheme ? "white" : "#063C18",
            color : !isTheme ? "#063C18" : "white",
            border: isTheme ? "3px solid white" : "3px solid #063C18",
        })
    }

    //Define Styles for Mui Text-fields
    const textFieldStyles = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: !isTheme ? 'white' : '#063C18',
            },
            '&:hover fieldset': {
                borderColor: !isTheme ? 'white' : '#063C18',
            },
            '&.Mui-focused fieldset': {
                borderColor: !isTheme ? 'white' : '#063C18',
            },
        },
        '& .MuiInputLabel-root': {
            color: !isTheme ? 'white' : '#063C18',
            fontFamily: `monospace`,
            fontWeight: `bold`,
            '&.Mui-focused': {
                color: !isTheme ? 'white' : '#063C18',
                fontFamily: `monospace`,
                fontWeight: `bolder`
            }
        }
    };
    
    //Load all the registered users details 
    const[users,setUsers] = useState([{}]);

    useEffect(()=>{
        //On Component mount load all the registered users details
        axios.get("https://spring-react-football.onrender.com/getUsers")
        .then((res)=>{
            setUsers(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })

        //On component mount set the card style also
        setCardStyle({ 
            backgroundColor : isTheme ? "white" : "#063C18",
            color : isTheme ? "#063C18" : "white",
            border: isTheme ? "3px solid white" : "3px solid #063C18",
        });

    },[])

    return(
        <div className="container-fluid d-flex justify-content-center">
            {/* Start the Login Form creation in a container */}
            <Container component="main" maxWidth="sm">
                {/* Create a Card which will hold the Login Form */}
                <Card elevation={8} style={cardStyle}>
                    {/* Make Card Header */}
                    <CardHeader 
                        avatar = {
                            <IconButton style={{border:isTheme?"2px solid #063C18" : "2px solid white"}} color="inherit">
                                <Login/>
                            </IconButton>
                        }
                        action={
                            <IconButton onClick={cardThemeClick} color="inherit">
                                {!isTheme ? <LightMode/> : <DarkMode/>}
                            </IconButton>
                        }

                        title = {<b className="fw-bold font-monospace fs-5">User Login Form</b>}
                    />
                    {/* Create the RegForm in the Card Body */}
                    <CardContent className="card-body font-monospace">
                        {/* Create the form */}
                        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                            <div className="mb-2">
                                <TextField
                                    sx={textFieldStyles}
                                    fullWidth
                                    required
                                    inputProps={{
                                        style:{
                                            color:!isTheme?"white" : "#063C18",
                                            fontFamily:"monospace",
                                            fontWeight:"bold"
                                        }
                                    }}
                                    name="userName"
                                    type="text"
                                    label="User Name"
                                    value={formik.values.userName}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="mb-2">
                                <TextField
                                    sx={textFieldStyles}
                                    fullWidth
                                    required
                                    inputProps={{
                                        style:{
                                            color:!isTheme?"white" : "#063C18",
                                            fontFamily:"monospace",
                                            fontWeight:"bold"
                                        }
                                    }}
                                    name="password"
                                    type="password"
                                    label="User Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />    
                            </div>
                            
                            <div className="mt-3 row text-center">
                                <div className="col-6 text-center">
                                    <Button type="submit" className="font-monospace fw-bold" variant="outlined" color="inherit">Login</Button>
                                </div>
                                <div className="col-6 text-center">
                                    <Button type="reset" className="font-monospace fw-bold" variant="outlined" color="inherit">Clear</Button>
                                </div>
                            </div>
                            <div className="mt-3 text-center">
                                <p className="font-monospace fw-bold">Dont have an account? <Link className="text-decoration-none" to="/home/register">Sign up</Link></p>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}
export default LoginComponent;