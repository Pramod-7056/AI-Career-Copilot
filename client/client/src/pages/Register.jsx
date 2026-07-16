  import { useState } from "react";
  import { useEffect } from "react";
  import "./Register.css"
  import { useNavigate } from "react-router-dom";
  
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

      if(data.success){
            alert("User register succesfully")
          window.location.href="./login"
        }
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
      <div className="register-page">
        <div className="register-card">
        <form className="register-form"onSubmit={handleSubmit}>
          <h1>Register</h1>
            
                <input type="text" placeholder="Enter ur name(required)" value={name} onChange={(e)=>setName(e.target.value)}/>

<br></br>
        <input type="email" placeholder="Enter ur email(required)" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <br></br>
        <input type="password" placeholder="Enter ur password(atleast 6 characters)" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <br /><br />
        <button type="submit">Register</button>

<p>{message}</p>
            
        </form>
        </div>
        </div>

        
    )
   
}
export default Register;