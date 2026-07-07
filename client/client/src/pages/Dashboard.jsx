import { useState,useEffect } from "react";


function Dashboard(){

    const [goals,setGoals]=useState([])

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

    useEffect(()=>{
        
   fetchGoals();
    },[])
    return(
        <div>
            <h1>Welcome to ur Dashboard</h1>
            

            <h2>My Goals</h2>

            {goals.map((goal)=>(
                <div key={goal._id}>
                    <p>{goal.title}</p>
                    </div>
            ))}
            </div>
        
    )
}

export default Dashboard;