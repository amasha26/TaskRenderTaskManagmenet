import { Request, Response } from "express";
import { sendErrorMsg } from "../common/http-exception";
import { Task } from "../interfaces/Task";
import tasks from "../Schemas/task.schema";
import { createTask, findAllTasks, findTaskById, findUserByUserId } from "../services/task.service";

export const createNewTask = async (req: Request, res: Response) => {
  const request: Task = req.body;
  console.log(JSON.stringify(request));

  try {
      res.send(await createTask(request));
  } catch (error) {
    sendErrorMsg(error, res);
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    res.send(await findAllTasks());
  } catch (error) {
    sendErrorMsg(error, res);
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  const data = { ...req.body };

  const { id } = data;
  try {
    res.send(await findTaskById(id));
  } catch (error) {
    sendErrorMsg(error, res);
  }
};

export const getTaskByUserId = async (req: Request, res: Response) => {
  const data = { ...req.body };

  const { uid } = data;
  try {
    res.send(await findUserByUserId(uid));
  } catch (error) {
    sendErrorMsg(error, res);
  }
};

export const updateNewTask =async (req:Request,res:Response) => {
    const data = { ...req.body };
    const { id } = data;

    console.log(id);
    const task = await findTaskById(id);
    console.log(task);
    if (!task['isCompleted']) {
        await tasks.updateOne({ _id: id }, { $set: { isCompleted: true } });
    }

    res.send();
    
}

export const deleteNewTask = async (req: Request, res: Response) => {
    const data = { ...req.body };
    const { id } = data;

    const task = await findTaskById(id);
    if (task) {
        await tasks.deleteOne({ _id: id  });
    }

    res.send();
    
}