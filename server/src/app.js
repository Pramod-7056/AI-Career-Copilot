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

const PORT=5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})