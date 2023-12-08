import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    setWeeklyGoal:{
        type:Number,
    },
    setMonthlyGoal:{
        type:Number
    },
    setYearlyGoal:{
        type:Number
    },
    acquiredPoints:{
        type:Array,
    },
    tasks:{
        type:Array
    }


});
export default mongoose.model("User",UserSchema);
