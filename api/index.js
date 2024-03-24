import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import authRoute from "./routes/auth.js"
import userRoute from "./routes/users.js"
import dotenv from "dotenv";
const app = express();
import User from "./models/User.js";
dotenv.config();
let test;
const connectToDataBase = async ()=>{
   
    try {
        await mongoose.connect(process.env.MONGO);
    } catch (error) {
        throw error;
    }

}
mongoose.connection.on("disconnected",()=>{
    console.log("MongoDB disconnected")
    
});
mongoose.connection.on("connected",()=>{
    console.log("MongoDB connected")
    
});

app.use(express.json())
app.use(cors({
    origin: 'https://deploy-mern-82v2cgx2d-dodos-projects-c4168a69.vercel.app/'
}));

app.get("/api/user/getTaskByIndex/:id/:index", async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        res.status(200).json(user.tasks[req.params.index]);
    } catch (error) {
        throw error;
    } // You can customize this response as needed
  });

app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.listen(4000,()=>{
    connectToDataBase();
    console.log("It's alive");
})