import {Link} from "react-router-dom";

function Navbar(){
    const token=localStorage.getItem("token");
    
    return(
         
        <nav className="navbar">

            <div className="logo">AI Career Copilot</div>

        <div className="nav-links">
            <Link to="/">Home</Link> |{" "}
            <Link to="/about">About</Link> |{" "}
            <Link to="/contact">Contact</Link> |
            {token?(
                <>
                <Link to="/profile">Profile</Link> |

                <Link to="/dashboard">Dashboard</Link> |
                 <button onClick={()=>{
                    localStorage.removeItem("token");
                    alert("Logout successfully")
                    window.location.href="/login";
                 }}> Logout</button>

                </>
            ):(
                <>
                <Link to="/login">Login</Link> |
            <Link to="/register">Register</Link> |
                </>
            )}
            </div>
            
        </nav>
    )
}
export default Navbar;
