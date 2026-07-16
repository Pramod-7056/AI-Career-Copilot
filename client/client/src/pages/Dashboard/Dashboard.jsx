import "./Dashboard.css";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Dashboard() {

    const navigate=useNavigate();

    const [user,setUser]=useState(null);
        useEffect(()=>{
            const fetchProfile=async()=>{
                const token=localStorage.getItem("token");
                const response=await fetch("http://localhost:5000/api/profile",{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                const data=await  response.json()
                if(data.success){
                    setUser(data.user)
                }
            }
            fetchProfile();
        },[])
  return (
    <div className="dashboard-page">

      <div className="welcome-card">
        <h1>👋 Welcome Back, {user?.name}</h1>
        <p>Your AI Career Dashboard</p>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h2>Resume Score</h2>
          <h1>0%</h1>
        </div>

        <div className="stat-card" onClick={()=>navigate("/projects")}>
          <h2>Projects</h2>
          <h1>0</h1>
        </div>

        <div className="stat-card">
          <h2>Certificates</h2>
          <h1>0</h1>
        </div>

        <div className="stat-card">
          <h2>Questions Solved</h2>
          <h1>0</h1>
        </div>

      </div>

      <div className="dashboard-grid">

    <div className="dashboard-card">
        <h2>📂 Portfolio</h2>
        <div className="info-row">
        <span>GitHub</span>
        <span>Not Added</span>
    </div>

    <div className="info-row">
        <span>LinkedIn</span>
        <span>Not Added</span>
    </div>

    <div className="info-row">
        <span>Portfolio</span>
        <span>Not Added</span>
    </div>

    <div className="info-row">
        <span>Resume</span>
        <span>Not Uploaded</span>
    </div>
    </div>

    <div className="dashboard-card">
        <h2>💻 Coding Profiles</h2>
       <div className="info-row">
    <span>LeetCode</span>
    <span>Not Connected</span>
</div>

<div className="info-row">
    <span>CodeChef</span>
    <span>Not Connected</span>
</div>

<div className="info-row">
    <span>HackerRank</span>
    <span>Not Connected</span>
</div>
    </div>

    <div className="dashboard-card" >
        <h2>🚀 Projects</h2>
        <div className="info-row">
    <span>Total Projects</span>
    <span>0</span>
    </div>
     <div className="info-row">
    <span>Latest Projects</span>
    <span>0</span>
    </div>

     <div className="info-row">
    <span>Status</span>
    <span>No projects</span>
    </div>
        
    </div>

    <div className="dashboard-card">
        <h2>🏆 Certificates</h2>
        <p>No Certificates Added</p>
    </div>

    <div className="dashboard-card">
        <h2>🥇 Achievements</h2>
        <p>No Achievements Added</p>
    </div>

    <div className="dashboard-card">
        <h2>💼 Experience</h2>
        <p>No Experience Added</p>
    </div>

</div>

    </div>
  );
}

export default Dashboard;