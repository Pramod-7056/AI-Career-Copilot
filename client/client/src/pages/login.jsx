import { useState } from "react";


function Login(){
     const [email,setEmail]=useState("");
      const [password,setPassword]=useState("");
      const [message,setMessage]=useState("");


      const handleSubmit=async (e)=>{
        e.preventDefault();
        
        const responseLogin= await fetch("http://localhost:5000/api/login",{
          method:"POST",
          headers:{
               "Content-Type":"application/json"
          },
          body:JSON.stringify({
               email,password

          }
     )
})
        
        const data=await responseLogin.json();
        setMessage(data.message);
     
        console.log(email);
        console.log(password);
     
       
      
     
     
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

            <p>{message}</p>

           
</form>



        
     )
     
}

export default Login;