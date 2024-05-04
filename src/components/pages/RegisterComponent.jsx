import { DarkMode, HowToReg, LightMode } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Container, IconButton, colors, TextField, Button } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterComponent = ()=>{

    //Create a navigate reference to nagigate between pages
    const navigate = useNavigate();

    //Create a formik reference to handle form info
    const formik = useFormik({
        initialValues:{
            userName : "",
            password : "",
            age : 0,
            nation : "",
            subscribed : true
        },
        onSubmit:values=>{
            //Make API Call for registering user to the Spring REST API
            axios.post(`https://spring-react-football.onrender.com/addUser`,values)
            .then((res)=>{
                console.log(res.data);
                alert(res.data);

                //Success registration, so navigate to Login page
                navigate("/home/login");
            })
            .catch((err)=>{
                console.log(err);
                alert(err);

                //registration failed so navigate to registration error page
                navigate("/regErrPage");
            })
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
    
    //On component mount set the card style also
    useEffect(()=>{
        setCardStyle({ 
            backgroundColor : isTheme ? "white" : "#063C18",
            color : isTheme ? "#063C18" : "white",
            border: isTheme ? "3px solid white" : "3px solid #063C18",
        })
    },[])

    return(
        <div className="container-fluid d-flex justify-content-center mt-5">
            {/* Start the Login Form creation in a container */}
            <Container component="main" maxWidth="sm">
                {/* Create a Card which will hold the Login Form */}
                <Card elevation={8} style={cardStyle}>
                    {/* Make Card Header */}
                    <CardHeader 
                        avatar = {
                            <IconButton style={{border:isTheme?"2px solid #063C18" : "2px solid white"}} color="inherit">
                                <HowToReg/>
                            </IconButton>
                        }
                        action={
                            <IconButton onClick={cardThemeClick} color="inherit">
                                {!isTheme ? <LightMode/> : <DarkMode/>}
                            </IconButton>
                        }

                        title = {<b className="fw-bold font-monospace fs-5">Registration Form</b>}
                    />
                    {/* Create the RegForm in the Card Body */}
                    <CardContent className="card-body font-monospace">
                        {/* Create the form */}
                        <form method="post" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
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
                                    name="age"
                                    type="number"
                                    label="User's Age"
                                    value={formik.values.age}
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
                                    name="nation"
                                    type="text"
                                    label="User's Country"
                                    value={formik.values.nation}
                                    onChange={formik.handleChange}
                                />    
                            </div>
                            <div className="mb-3 form-switch">
                                <input             
                                    className="form-check-input"
                                    type="checkbox"
                                    name="subscribed"
                                    checked={formik.values.subscribed}
                                    value={formik.values.subscribed}
                                    onChange={formik.handleChange}
                                />&nbsp;<b>Subscription</b>
                            </div>
                            <div className="mt-3 row text-center">
                                <div className="col-6 text-center">
                                    <Button type="submit" className="font-monospace fw-bold" variant="outlined" color="inherit">Register</Button>
                                </div>
                                <div className="col-6 text-center">
                                    <Button type="reset" className="font-monospace fw-bold" variant="outlined" color="inherit">Clear</Button>
                                </div>
                            </div>
                            <div className="mt-3 text-center">
                                <p className="font-monospace fw-bold">Already have an account? <Link className="text-decoration-none" to="/home/login">Log in</Link></p>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}
export default RegisterComponent;