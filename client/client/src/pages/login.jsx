import { useState } from "react";


function Login(){
     const [email,setEmail]=useState("");
      const [password,setPassword]=useState("");

      const handleSubmit=(e)=>{
        e.preventDefault();

        console.log("Email:",email);
        console.log("Password",password);

        setEmail(" ")
        setPassword(" ")
      }

      

     return(
        <form onSubmit={handleSubmit}>
       
            <h1>Login</h1>
            <input type="email" placeholder="Enter ur email" value={email} onChange={(e)=>
            setEmail(e.target.value)

            }/>      ||

            <input type="password" placeholder="Enter ur Password" value={password} onChange={(e)=>
            setPassword(e.target.value)

            }/>

            <button type="submit">Login</button>

            <p>{email}</p>

           
</form>



        
     )
     
}
export default Login;