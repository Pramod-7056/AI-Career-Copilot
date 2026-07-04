  import { useState } from "react";
  import { useEffect } from "react";
  
  function Register(){
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const[message,setMessage]=useState("")

    useEffect(()=>{
              const token=localStorage.getItem("token")
              if(token){
                   window.location.href="/profile"
              }
          },[])

    const handleSubmit=async (e)=>{
      e.preventDefault();
try{
      const response=await fetch("http://localhost:5000/api/register",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
          body:JSON.stringify({
            name,email,password
          })
        
      })

      const data=await response.json();
      setMessage(data.message)
    }
    catch(error){
      setMessage("Something wrong")
    }
        

        console.log(name)
        console.log(email);

        setName("")
        setPassword("")
        setEmail("")
        
    }

    return(
        <form onSubmit={handleSubmit}>
            
                <input type="text" placeholder="Enter ur name" value={name} onChange={(e)=>setName(e.target.value)}/>

<br></br>
        <input type="email" placeholder="Enter ur email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <br></br>
        <input type="password" placeholder="Enter ur password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <br /><br />
        <button type="submit">Register</button>

<p>{message}</p>
            
        </form>

        
    )
   
}
export default Register;