import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async(req,res)=>{
    try {
        console.log("Tijelo",req.body);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);
        const newUser = new User({
            username:req.body.username,
            password:hash,
            setWeeklyGoal:req.body.setWeeklyGoal,
            setMonthlyGoal:req.body.setMonthlyGoal,
            setYearlyGoal:req.body.setYearlyGoal,
            acquiredPoints:req.body.acquiredPoints,
            tasks:req.body.tasks

        });
        await newUser.save();
        res.status(201).send("User has been created");
    } catch (err) {
        throw err
    }

};

export const login = async(req,res)=>{
    try {
        const user = await User.findOne({username:req.body.username});
        console.log("username: ",user);
        if(user==null){
            res.status(404).send("User not found");
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
        if(!isPasswordCorrect){
            res.status(404).send("Incorrect password");
        }
        const token = jwt.sign({id:user._id},process.env.JWT);
        const {password,...otherDetails}= user._doc;
        res.cookie("access_token",token,{httpOnly:true}).status(200).json({...otherDetails});//created successfully
    } catch (error) {
        throw error;
    }

}

export const logout = (req,res)=>{
    res.clearCookie("access_token",{httpOnly:true});
    res.status(200).send("Logged out successfully");
}