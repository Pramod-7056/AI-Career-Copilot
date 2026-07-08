import { useState,useEffect } from "react";
import "./Dashboard.css";


function Dashboard(){

    const [goals,setGoals]=useState([])
    const [title,setTitle]=useState("")

    const fetchGoals = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/goals", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log(data);

        setGoals(data.goals);

    } catch (error) {
        console.log(error);
    }
};

const addGoal=async()=>{
    try{
        const token=localStorage.getItem("token");
        await fetch("http://localhost:5000/api/goals",{
            method:"POST",
            headers:{
                "Content-Type":"Application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify({
                title
            })
        })
        setTitle("")
        fetchGoals()
    }

catch(error){
   console.log(error)
}
}

const completeGaol=async(id)=>{
    try{
        const token=localStorage.getItem("token");
        await fetch(`http://localhost:5000/api/goals/${id}`,{
            method:"PUT",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        fetchGoals()
    }

catch(error){
   console.log(error)
}
}


const deleteGaol=async(id)=>{
    try{
        const token=localStorage.getItem("token");
        await fetch(`http://localhost:5000/api/goals/${id}`,{
            method:"DELETE",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        fetchGoals()
    }

catch(error){
   console.log(error)
}
}

    useEffect(()=>{
        
   fetchGoals();
    },[])
    
        return (
  <div className="dashboard">
    <h1>Welcome to your Dashboard</h1>

    <div className="goal-input">
    <input
        type="text"
        placeholder="Enter a goal..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
    />

    <button onClick={addGoal}>
        +Add Goal
    </button>
</div>

    <div className="header">

    
      <h2>My Goals</h2>
      
    </div>

    {goals.map((goal) => (
      <div className="goal-card" key={goal._id}>
        <div>
          <h3>{goal.title}</h3>
          <p>{goal.completed ? "✅ Completed" : "⏳ Pending"}</p>
        </div>

        <div className="actions">
          <button className="complete-btn" onClick={()=>completeGaol(goal._id)}>Complete</button>
          <button className="delete-btn" onClick={()=>deleteGaol(goal._id

          )}>Delete</button>
        </div>
      </div>
    ))}
  </div>
);
}

export default Dashboard;