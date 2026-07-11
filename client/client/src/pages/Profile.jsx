import { useState } from "react";
import { useEffect } from "react";
import "./Profile.css"

function Profile(){

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
        <div className="profile-page">
<div className="profile-container">

<div className="profile-header">

<div className="profile-avatar">
👤
</div>

<h1>{user?.name}</h1>

<p>{user?.email}</p>

<button className="edit-btn">
Edit Profile
</button>

</div>

<div className="profile-grid">

<div className="profile-card">

<h2>Basic Information</h2>

<div className="profile-item">
<label>Name</label>
<p>{user?.name}</p>
</div>

<div className="profile-item">
<label>Email</label>
<p>{user?.email}</p>
</div>

<div className="profile-item">
<label>Phone</label>
<p>Not Added</p>
</div>

<div className="profile-item">
<label>Bio</label>
<p>Tell recruiters about yourself...</p>
</div>

</div>

<div className="profile-card">

<h2>Education</h2>

<div className="profile-item">
<label>College</label>
<p>Not Added</p>
</div>

<div className="profile-item">
<label>Degree</label>
<p>Not Added</p>
</div>

<div className="profile-item">
<label>Branch</label>
<p>Not Added</p>
</div>

<div className="profile-item">
<label>Graduation Year</label>
<p>Not Added</p>
</div>

</div>

</div>

</div>
</div>
)
       
}

export default Profile;