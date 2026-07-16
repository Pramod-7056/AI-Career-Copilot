const express=require('express')
const cors=require('cors')
const path=require("path")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const Goal=require("../models/goal")
const Project=require("../models/project")
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

    if(error.name==="TokenExpiredError"){
      alert("Session expired.Please login again")
      return res.status(401).json({
      success:false,
      
      message:"Session expired.Please login again"
    }) 
    }
    
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

app.get("/api/profile",verifyToken,async (req,res)=>{
  try{
        const user=await User.findById(req.user.id).select("-password")

    res.json({
       success:true,
       user
    })
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
})


app.post("/api/goals",verifyToken,async(req,res)=>{
  try{
    const {title,description}=req.body;
    const goal=await Goal.create({
      title,
      description,
      user:req.user.id
    })
    res.status(201).json({
      success:true,
      goal
    })
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
})


app.get("/api/goals",verifyToken,async (req,res)=>{
  try{
        const goals=await Goal.find({user:req.user.id})

    res.json({
       success:true,
       goals
    })
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
})

app.put("/api/goals/:id", verifyToken, async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);

        if (!goal) {
            return res.status(404).json({
                success: false,
                message: "Goal not found"
            });
        }

        if (goal.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        goal.completed = !goal.completed;

        await goal.save();

        res.json({
            success: true,
            goal
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.put("/api/goals/edit/:id",verifyToken,async(req,res)=>{
  try{
  const goal = await Goal.findById(req.params.id);
  goal.title=req.body.title
  goal.description=req.body.description

  await goal.save();

     res.json({
            success: true,
            goal
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
  
})


app.delete("/api/goals/:id", verifyToken, async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);

        if (!goal) {
            return res.status(404).json({
                success: false,
                message: "Goal not found"
            });
        }

        if (goal.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

      

        await goal.deleteOne();

        res.json({
            success: true,
            message:"Goal deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

//project section

app.post("/api/projects",verifyToken,async(req,res)=>{
  try{
    const {title,description,github_link,demo_link,tech_stack}=req.body
    const project=await Project.create({
      title,
      description,
      github_link,
      demo_link,
      tech_stack,
      user:req.user.id
    })
    res.status(201).json({
      success:true,
      project
    })
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
})

app.get("/api/projects",verifyToken,async(req,res)=>{
  try{
    const project=await Project.find({user:req.user.id})
    if(project==""){
      res.status(201).json({
    success:false,
    message:"No projects added"  })
    }

    res.status(201).json({
      success:true,
      project
    })
  }
  catch(error){
    res.status(500).json({
    success:false,
    message:error.message
  })
}
})

app.put("/api/projects/:id", verifyToken, async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        if (project.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        project.title = req.body.title;
        project.description = req.body.description;
        project.github_link = req.body.github_link;
        project.demo_link = req.body.demo_link;
        project.tech_stack = req.body.tech_stack;

        await project.save();

        res.json({
            success: true,
            project
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

app.delete("/api/projects/:id", verifyToken, async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        if (project.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        await project.deleteOne();

        res.json({
            success: true,
            message: "Project deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


 app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if(name==""||email==""){
      return res.status(400).json({
        success:false,
        message:"name and email can't be empty"
      })
    }
    if(password.length<6){
       return res.status(400).json({
        success:false,
        message:"password length must be 6 characters"
      })
    }

    const hashedPassword=await bcrypt.hash(password,10);

    
      
    const existingUser=await User.findOne({email})
    if(existingUser){
      return res.status(400).json({
        success:false,
        message:"User already exists"
      })
    }
      
    

    const user = await User.create({
      name,
      email,
      password:hashedPassword
    });

    res.json({
      success:true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success:false,
      message: "Something went wrong",
    });
  }
});
    
app.post("/api/login", async (req, res) => {
  try{  
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    console.log(user)
    if(email==""||password==""){
       return res.json({
        success:false,
        message:"email and password can't be empty"
      })

    }


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