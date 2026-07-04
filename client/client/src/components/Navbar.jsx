import {Link} from "react-router-dom";

function Navbar(){
    const token=localStorage.getItem("token");
    return(
        <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="/about">About</Link> |{" "}
            <Link to="/contact">Contact</Link> |
            {token?(
                <>
                <Link to="/profile">Profile</Link> |
                 <button onClick={()=>{
                    localStorage.removeItem("token");
                    alert("Logout successfully")
                    window.location.href="/";
                 }}> Logout</button>

                </>
            ):(
                <>
                <Link to="/login">Login</Link> |
            <Link to="/register">Register</Link> |
                </>
            )}
            
        </nav>
    )
}
export default Navbar;
