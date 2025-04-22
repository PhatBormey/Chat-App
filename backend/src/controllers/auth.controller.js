import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../lib/util.js";
import cloudinary from "../lib/cloudinary.js";

const getAuth= async(req,res)=>{
    try{
        const users=await User.find();
        res.status(200).json(users)
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
}
const getAuthByName= async(req,res)=>{
    try{
        const {fullName}=req.params;
        const users=await User.find({ fullName: { $regex: fullName, $options: "i" } });
        if(users.length===0){
            res.status(404).json({
                message:"Name not found!"
            })
        }
        res.status(200).json(users)
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
}
const signup=async(req,res)=>{
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Request body is missing" });
    }
    const {fullName,email,password}=req.body;
    try{
        if(!fullName || !email || !password){
            res.status(400).json({
                message:"FullName,Email,Password are not empty",
            })
        }
        if(password.length<6){
            return res.status(400).json({
                message:"Password must be at least 6 charater!"
            });
        }
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"Email already exists"
            });
        }
        const salt=await bcrypt.genSalt(10);
        const hashPass=await bcrypt.hash(password,salt);
        const newUser=new User({
            fullName,
            email,
            password:hashPass
        });
        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
            })
        }else{
            res.status(400).json({
                message:"Invalid user data"
            });
        }
    }catch(error){
        console.log(`Error in sign up controller`,error.message);
        res.status(500).json({
            message:"Internal Server Error "
        });
    }
}
const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        if(!email || !password){
            res.status(404).json({
                message:"email or password not empty."
            })
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Invalid credentails"
            })
        }

       const isPasswordCorrect= await bcrypt.compare(password,user.password);
       if(!isPasswordCorrect){
        return res.status(400).json({
            message:"Invalid credentails"
        })
       }
       generateToken(user._id,res);
       res.status(200).json({
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
        profilePic:user.profilePic
       })
    }catch(error){
        res.status(500).json({
           
            message:"Internal Server Error",
        })
    }
}
const logout=async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({
            message:"Logout successfully"
        })
    }catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
        })
    }
}
const updateProfilePic=async(req,res)=>{
   try{
        const {profilePic}=req.body;
        const userId=req.user._id;
        if(!profilePic){
            res.status(400).json({
                message:"Profile Pic is required"
            })
        }
        const uploadRespone=await cloudinary.uploader.upload(profilePic);
        const updateUser=await User.findByIdAndUpdate(userId,{profilePic:uploadRespone.secure_url},{new:true});
        res.status(200).json(updateUser);
   }catch(error){
    console.log("Error in updateProfilePic controller",error.message)
        res.status(500).json({
            message:"Internal server error."
        })
   }

}
const checkAuth=async(req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller",error.message)
        res.status(500).json({
            message:"Internal server error."
        })
    }
}
export default {getAuth,getAuthByName,signup,login,logout,updateProfilePic,checkAuth}