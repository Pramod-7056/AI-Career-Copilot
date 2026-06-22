import { useEffect,useState } from "react";

function App(){
  const [message,setMessage]=useState("")

  

  useEffect(()=>{
    fetch("http://localhost:5000/api/health")
    .then((res)=>res.json())
    .then((data)=>{
      setMessage(data)
      
      
      
    })
    
    
    .catch(()=>{
      setMessage("Backend not Connected")
    })
  },[])
  return(
    <div>
      <h1>AI Career Copilot change 1</h1>
      <p>Your Ai powered placement preparation companion.</p>
      <h3>Backend Status:{message.status}</h3>
      <h4>Backend Version:{message.version}</h4>
      <button>Get Started</button>
    </div>
  )
}

export default App;