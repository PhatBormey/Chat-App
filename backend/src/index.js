import express from"express";
import authRoutes from "./routes/auth.route.js";
import MessageRoute from "../src/routes/message.route.js";
import dotenv from "dotenv"
import connectDB from "./lib/db.js";
import  cookieParser  from "cookie-parser";
import cors from 'cors';
const app=express();
const PORT=process.env.PORT; 
dotenv.config();
app.use(express.json({ limit: "1000mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true ,limit: "1000mb"}));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));

app.use("/api/auth",authRoutes);
app.use("/api/message",MessageRoute);
app.get("/",(req,res)=>{
    res.send("Hello Fullstack 1")
})


app.listen(PORT,()=>{
    console.log("server running at http://localhost:"+PORT);
    connectDB();
})