const express=require('express')
const cors=require('cors')


const app=express()
app.use(cors())
app.use(express.json())

app.get("/api/health",(req,res)=>{
    res.json({
        status:"working",
        project:"AI Career  Copilot",
       version:"1.0"
    })
})

app.post("/api/register",(req,res)=>{
        console.log(req.body);
       
        res.json({
            success:"true",
            
            message:"User Registered succesfully"
            
        })
    })

    app.post("/api/login",(req,res)=>{
        const {email,password}=req.body;
        console.log(req.body)
        if(email==="admin123@gmail.com"&&password==="12345678"){
       
       return res.json({
            success:true,
            
            message:"Login succesfully"
            
        })
    
    }
 
    return res.json({
    success:false,
    message:"Invalid credentials"
    
        
})
    
})


const PORT=5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})