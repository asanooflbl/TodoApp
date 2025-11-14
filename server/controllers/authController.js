import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";


export const userRegister = async(req,res)=>{
    try {
        const {username , email, password} = req.body;
        const exists = await User.findOne({email});
        if(exists){
            return res.json({success:false, message:"Email already exists"})
        }
        const hashed = await bcrypt.hash(password,10);
        const user = await User.create({
            username,
            email,
            password:hashed
        });
        const token = jwt.sign({id: user._id },process.env.JWT_SECRET);
        res.json({success:true ,message:"User registered" ,token,
             user: {
                id:user._id,
                username:user.username,
                email:user.email
            }
        }
           
        )
    } catch (error) {
        res.json({success:false , message:error.message})
    }
}



export const userLogin =async(req,res)=>{
    try {
         const{email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
       return res.json({success:false,message:"Invalid User"})
    }
   const match = await bcrypt.compare(password,user.password)
   if(!match){
    return res.json({success:false,message:"Invalid Password"})
   }
   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
   res.json({
    success:true, message:"User Logged in Successfully",token,
    user:{
        id:user._id,
        username: user.username,
        email: user.email
    }
   })
        
    } catch (error) {
      res.json({success:false , message:error.message})  
    }
   
}

