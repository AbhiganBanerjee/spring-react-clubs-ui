import { Home, HowToReg, Login } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";

const HomeComponent = ()=>{

    //create a navigate ref
    const navgiate = useNavigate();

    return(
        <div className="container-fluid">
            <header className="text-center" style={{border:"4px solid white"}}>
                <h3 className="font-monospacem fw-bold"> <Home/> Welcome to Home Page</h3>
            </header>
            <section className="row">
                <nav className='col-3 d-flex' style={{backgroundColor:"inherit"}}>
                    <div className="mt-2 d-flex" style={{marginLeft:"10px"}}>
                        <Link className='text-decoration-none text-white fw-bold fs-5' to="login" ><Button variant="contained" size="small" color="success" className="font-monospace fw-bold text-white">Login&nbsp;<Login/></Button></Link>  
                    </div>
                    <div className="mt-2 d-flex" style={{marginLeft:"40px"}}>
                    <Link className='text-decoration-none text-white fw-bold fs-5' to="register"><Button size="small" variant="contained" color="success" className="font-monospace fw-bold text-white">Register&nbsp;<HowToReg/></Button></Link>
                    </div>
                </nav>
                <main className="col-10 d-flex justify-content-center align-items-center" style={{height:"460px", marginLeft:"145px"}}>
                    <Outlet/>
                </main>
            </section>   
        </div>
    );
}

export default HomeComponent;