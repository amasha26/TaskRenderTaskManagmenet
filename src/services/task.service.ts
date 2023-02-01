import { Task } from "../interfaces/Task";
import tasks from "../Schemas/task.schema";

export const createTask = async (request: Task) => {
    let task = new tasks(request);
    console.log(request)
  return task.save();
};

export const findAllTasks = async () => {
  const taskList: Task[] = await tasks.find();
  return taskList;
};

export const findTaskById = async (id: String) => {
  return await tasks.findOne({ _id: id });
};

export const findUserByUserId = async (uid: String) => {
  return await tasks.find({ uid: uid });
};
