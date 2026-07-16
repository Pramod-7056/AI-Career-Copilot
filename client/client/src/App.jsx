import { BrowserRouter,Routes,Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import Goals from "./pages/Home/Goals";
import Project from "./pages/Dashboard/Projects";


function App(){


    
    return(
        <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/goals" element={<Goals/>}/>
            <Route path="/projects" element={<Project/>}/>
        </Routes>

        
        </BrowserRouter>
    )
}
export default App;
