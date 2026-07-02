import { useState } from "react";
import { useEffect } from "react";

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
    return(
        <div>
            <h1>Profile</h1>
            {user?(
                <>
                <h3>Email:{user.email}</h3>
                <p>ID:{user._id}</p>
                </>
            ):(
                <h3>Loading...</h3>
            )}
        </div>
    )
}

export default Profile;