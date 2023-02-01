import * as express from "express";
import {
  createNewTask,
  deleteNewTask,
  getAllTasks,
  getTaskById,
  getTaskByUserId,
  updateNewTask,
} from "../controllers/task.controller";
// import { verifyTokenExists } from "../middlewares/authMiddleware";

const taskRoute = express.Router();

taskRoute.post("/create", createNewTask);
taskRoute.put("/update-task", updateNewTask);
taskRoute.post("/delete-task", deleteNewTask);
taskRoute.get("/get-alltasks", getAllTasks);
taskRoute.get("/get-taskbyid", getTaskById);
taskRoute.get("/get-taskbyuserid", getTaskByUserId);

export default taskRoute;