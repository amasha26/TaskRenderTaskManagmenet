import * as express from "express";
import { createUserAccount, getUserById, getAllUsers, getUserByEmail, userLogin } from "../controllers/user.controller";

const userRoute = express.Router();

userRoute.post("/create", createUserAccount);
userRoute.post("/login", userLogin);

userRoute.get("/get-allusers", getAllUsers);
userRoute.get("/get-userbyid", getUserById);
userRoute.get("/get-userbyemail", getUserByEmail);

export default userRoute;