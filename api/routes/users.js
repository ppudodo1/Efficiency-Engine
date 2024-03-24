import express from "express";
import { weeklyGoal,monthlyGoal,yearlyGoal, updatePoints, updateTasks, getPendingTasks, getCompletedTasks, getUserData, changeTask, getAllTask, getTaskByIndex, deleteTaskByIndex,getTest } from "../controllers/users.js";


const router = express.Router();

router.put("/weekly",weeklyGoal);
router.put("/monthly",monthlyGoal);
router.put("/yearly",yearlyGoal);
router.put("/points/:id",updatePoints);
router.put("/tasks/:id",updateTasks);
router.get("/pending/:id",getPendingTasks);
router.get("/completed/:id",getCompletedTasks);
router.get("/data/:id",getUserData);
router.post("/changeTask/:id/:taskNumber",changeTask);
router.get("/getAllTasks/:id",getAllTask);
router.get("/getTaskByIndex/:id/:index",getTaskByIndex);
router.get("/test",getTest);
router.delete("/removeTaskByIndex/:id/:index",deleteTaskByIndex);

export default router;