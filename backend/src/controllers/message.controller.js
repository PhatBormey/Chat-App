
import cloudinary from '../lib/cloudinary.js';
import Message from '../models/message.model.js';
import User from '../models/user.model.js';
const getUserForSidebar=async(req,res)=>{
    try {
        const logedInUserId=req.user._id;
        const filteredUser=await User.find({_id:{$ne:logedInUserId}}).select("-password");
        res.status(200).json(filteredUser)
    } catch (error) {
        console.log("Error in getuserForSidebar controller",error.message);
        res.status(500).json({
            error:"Internal server error"
        })
    }
}
const getMessages=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const myId=req.user._id;
        const messages=await Message.find({
            $or:[
                {myId:myId,receiverId:userToChatId},
                {myId:userToChatId,receiverId:myId}
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessage controller",error.message);
        res.status(500).json({
            error:"Internal server error."
        })
    }
}
const sendMessages=async(req,res)=>{
    try {
        const {text,image}=req.body;
        const {id:receiverId}=req.params;
        const myId=req.user._id;
        let imageUrl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }
        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        });
        await newMessage.save();
        res.status(200).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller.",error.message);
        res.status(500).json({
            error:"Internal server error"
        })
    }
}
export default {getUserForSidebar,getMessages,sendMessages}