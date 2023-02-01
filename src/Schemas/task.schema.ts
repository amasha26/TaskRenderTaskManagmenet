import { Schema } from "mongoose";
import mongoose from "mongoose";

const Task = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId, required: false },
    title: String,
  uid:String,
  description: String,
  isCompleted: Boolean,
  createdAt: String,
  updatedAt: String,
});

const tasks = mongoose.model("tasks", Task);
export default tasks;
