const express=require('express')
const cors=require('cors')
const path=require("path")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")

const User=require("../models/user")

require("dotenv").config({
    path:path.join(__dirname,"../.env"),
});
const connectDB=require("../config/db");



const app=express()
connectDB();

app.use(cors())
app.use(express.json())


const verifyToken=(req,res,next)=>{
  const authHeader=req.headers.authorization;
  if(!authHeader){

    return res.status(401).json({
      success:false,
      message:"No Token Provided"
    }) 
  }

  const token=authHeader.split(" ")[1]
  try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    console.log(decoded)
    req.user=decoded;
    next();
  }
  catch(error){
 return res.status(401).json({
      success:false,
      message:"Invalid token"
    }) 
  }
  
}

app.get("/api/health",(req,res)=>{
    res.json({
        status:"working",
        project:"AI Career  Copilot",
       version:"1.0"
    })
})

app.get("/api/profile",verifyToken,(req,res)=>{
    res.json({
       message:"Welcome to ur profile"
    })
})


 app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword=await bcrypt.hash(password,10);

    const user = await User.create({
      name,
      email,
      password:hashedPassword
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
     
    const match=await bcrypt.compare(password,user.password)
    if(!match){
      return res.json({
        success:false,
        message:"Incorrect password"
      })
    }


    const token=jwt.sign(
      {id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:"1d"}
      
    
  )
    

    return res.json({
      success:true,
      
      message:"Login successfully",
      token
      
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