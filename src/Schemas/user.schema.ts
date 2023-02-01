import { Schema } from "mongoose";
import mongoose from "mongoose";

const User = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId, required: false },
  fname: String,
  lname: String,
  age: Number,
  email: String,
  password: String,
});

const users = mongoose.model("users", User);
export default users;
