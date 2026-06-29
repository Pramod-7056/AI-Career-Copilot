const express=require('express')
const cors=require('cors')
const path=require("path")

const User=require("../models/user")

require("dotenv").config({
    path:path.join(__dirname,"../.env"),
});
const connectDB=require("../config/db");



const app=express()
connectDB();

app.use(cors())
app.use(express.json())

app.get("/api/health",(req,res)=>{
    res.json({
        status:"working",
        project:"AI Career  Copilot",
       version:"1.0"
    })
})


 app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    res.json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});
    
app.post("/api/login", async (req, res) => {
  try{  
    const { email, password } = req.body;

   

    const user = await User.findOne({ email });
    
    console.log(user)


    if(!user){
      return res.json({
        success:false,
        message:"User not found"
      })
    }
    if(user.password !== password){
      return res.json({
        success:false,
        message:"Incorrect password"
      })
    }
    
    return res.json({
      success:true,
      message:"Login successfully"
      
    })
  }
  catch(err){
    console.log(err)
    return res.status(500).json({
      success:false,
      message:"Server error"
    })
  }
});


const PORT=5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})