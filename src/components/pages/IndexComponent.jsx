//This component is the Index page which will contain options like Home and Dashboard

//import the styles 
import { Sports} from '@mui/icons-material';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeComponent from './HomeComponent';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import { useEffect, useState } from 'react';
import DashboardComponent from './DashboardComponent';

const IndexComponent = ()=>{

    //Define property for Style binding
    const[myStyle,setMyStyle] = useState({});

    useEffect(()=>{
        //on component mount set the styles
        setMyStyle(
            {
                backgroundImage: `url(/b5.jpg)`,
                backgroundSize: "contain",
                minHeight: "110vmax",    /*Viewport max height it will expand automatically if required*/
                color: "red"
            }
        );
    },[])

    //return the markup or presentation
    return(
        <div className="container-fluid font-monospace" 
            style={myStyle} 
            //Binding the style in this component
        >
            <header className='text-center text-white'>
                <h1 className='fw-bold fst-italic'><Sports fontSize='250px'/> Welcome to World Football Exploration Page</h1>
            </header>
            {/* Define Browser Router and Home, Dashboard Routing */}
            <BrowserRouter>
                <section className='row'>
                    <nav className='col-3 d-flex' style={{backgroundColor:"inherit"}}>
                        <div className="mt-2 d-flex" style={{marginLeft:"10px"}}>
                            <Link className='text-decoration-none text-white fw-bold fs-4' to="/home">Home</Link>
                        </div>
                        <div className="mt-2 d-flex" style={{marginLeft:"40px"}}>
                            <Link className='text-decoration-none text-white fw-bold fs-4'  to="/dashboard">Dashboard</Link>
                        </div>   
                    </nav>
                    <main className='mt-2 mb-2 col-12'>
                        {/* Define the Routes Here */}
                        <Routes>
                            <Route path='home' element={<HomeComponent/>}>
                                {/* Create Nested Route for Login and Register component in Home */}
                                <Route path='login' element={<LoginComponent/>}/>
                                <Route path='register' element={<RegisterComponent/>}/>
                            </Route>
                            {/* Error page for login failure */}
                            <Route path='/loginErr'
                                element = {
                                    <div className='text-bg-warning d-flex justify-content-center container-fluid fw-bold fs-4 font-monospace '>   
                                        <code>Invalid Log in Credentials!! Try Again&nbsp;<Link className='text-decoration-none' to="/home/login">Log in</Link></code>     
                                    </div>
                                }
                            />
                            {/* Error page for failed registration */}
                            <Route path='/regErrPage'
                                element = {
                                    <div className='text-bg-warning d-flex justify-content-center container-fluid fw-bold fs-4 font-monospace '>   
                                        <code>Registration Failed!! Try Again&nbsp;<Link className='text-decoration-none' to="/home/register">Sign up</Link></code>     
                                    </div>
                                }
                            />
                            <Route path='dashboard' element={<DashboardComponent/>}></Route>
                        </Routes>
                    </main>
                </section>
            </BrowserRouter>
        </div>
    );
}

//export the component
export default IndexComponent;