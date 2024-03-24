import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import authRoute from "./routes/auth.js"
import userRoute from "./routes/users.js"
import dotenv from "dotenv";
const app = express();
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
    test = 0;
});
mongoose.connection.on("connected",()=>{
    console.log("MongoDB connected")
    test=1;
});

app.use(express.json())
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to the API",test); // You can customize this response as needed
  });

app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.listen(4000,()=>{
    connectToDataBase();
    console.log("It's alive");
})