const mongoose=require("mongoose");
const goalSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    completed:{
        type:Boolean,
        default:false
    },
    
       user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
       } 
    
},{timestamps:true});

const Goal= mongoose.model("Goal",goalSchema);
module.exports= Goal