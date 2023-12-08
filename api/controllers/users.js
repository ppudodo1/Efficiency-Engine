import User from "../models/User.js";


export const weeklyGoal = async(req,res)=>{
    try {
        const update = {setWeeklyGoal:req.body.setWeeklyGoal};
       
        const user = await User.findOneAndUpdate({username:req.body.username},update,{ new: true });
        user.save();
        res.status(200).json(user);
    } catch (error) {
        throw error;
    }

}
export const monthlyGoal = async(req,res)=>{
    try {
        const update = {setMonthlyGoal:req.body.setMonthlyGoal};
       
        const user = await User.findOneAndUpdate({username:req.body.username},update,{ new: true });
        user.save();
        res.status(200).json(user);
    } catch (error) {
        throw error;
    }

}
export const yearlyGoal = async(req,res)=>{
    try {
        const update = {setYearlyGoal:req.body.setYearlyGoal};
        const user = await User.findOneAndUpdate({username:req.body.username},update,{ new: true });
        user.save();
        res.status(200).json(user);
    } catch (error) {
        throw error;
    }

}
export const updatePoints = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        let check = 0;
        let newData = {
            points:0,
            time:""
        }
        for(let i = 0;i<user.acquiredPoints.length;i++){
            const date = user.acquiredPoints[i].time.split(' ')[0];
          
            if(date==req.body.acquiredPoints.time.split(' ')[0]){
               // newPoints = user.acquiredPoints[i].points + req.body.acquiredPoints.points;
                //user.acquiredPoints[i].points += req.body.acquiredPoints.points;
                
                newData.points = user.acquiredPoints[i].points + req.body.acquiredPoints.points;
                newData.time = date;
                console.log("Usli smo", user.acquiredPoints[i].time)
                check = 1;
                user.acquiredPoints.push(newData);
                user.acquiredPoints.splice(i,1);
                break;
            }
        }
        if(check!=1){
            console.log("Zasto si ovdje")
            user.acquiredPoints.push(req.body.acquiredPoints);   
        }
      
        user.save();
        res.status(200).json(user);
    } catch (error) {
        throw error;
    }

}
export const updateTasks = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        user.tasks.push(req.body.tasks);
        user.save();
        res.status(200).json(user);
    } catch (error) {
        throw error;
    }
}
export const getPendingTasks = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const pendingTasks = user.tasks.filter((item)=>!item.completed);
     
        res.status(200).json(pendingTasks);
    } catch (error) {
        throw error;
    }
}
export const getCompletedTasks = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const completedTasks = user.tasks.filter((item)=>item.completed);
        res.status(200).json(completedTasks);
    } catch (error) {
        throw error;
    }
}
export const getUserData = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        throw error;
    }

}
export const changeTask = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        
        user.tasks[req.params.taskNumber].completed= true;
        try {
            await user.markModified('tasks'); 
            await user.save();
            return res.status(200).json(user);
        } catch (saveError) {
            return res.status(500).json({ message: 'Error saving user', error: saveError });
        }
        
         
    } catch (error) {
        throw error;
    }
}
export const getAllTask = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user.tasks);
    } catch (error) {
        throw error;
    }
}
export const getTaskByIndex = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        
        res.status(200).json(user.tasks[req.params.index]);
    } catch (error) {
        throw error;
    }
}
export const deleteTaskByIndex = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const index = req.params.index;
        user.tasks.splice(index,1);
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        throw error;
    }

}