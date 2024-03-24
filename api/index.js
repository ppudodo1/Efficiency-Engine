import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const connectToDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB connected"); // Log MongoDB connection success
  } catch (error) {
    console.error("MongoDB connection error:", error.message); // Log MongoDB connection error
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected"); // Log MongoDB disconnection
});

// No need to log MongoDB connection on 'connected' event since we're already logging it in the connectToDataBase function.

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the API"); // You can customize this response as needed
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

const PORT = process.env.PORT || 4000; // Use the PORT environment variable provided by Vercel or default to 4000

app.listen(PORT, () => {
  connectToDataBase(); // Connect to MongoDB when the server starts
  console.log(`Server is running on port ${PORT}`);
});
