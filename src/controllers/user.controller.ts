import { Request, Response } from "express";
import { sendErrorMsg } from "../common/http-exception";
import { User } from "../interfaces/User";
import {
  createUser,
  findAllUsers,
  findUserByEmail,
  findUserById,
} from "../services/user.service";
var jwt = require("jsonwebtoken");
require("dotenv").config();

export const createUserAccount = async (req: Request, res: Response) => {
  const request: User = req.body;
  console.log(JSON.stringify(request));

  try {
    if (!(await findUserByEmail(request.email))) {
      return res.send(await createUser(request));
    } else {
      return res.status(409).send({ error: true, msg: "User already exist" });
    }
  } catch (error) {
    sendErrorMsg(error, res);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    return res.send(await findAllUsers());
  } catch (error) {
    sendErrorMsg(error, res);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const data = { ...req.body };

  const { id } = data;
  try {
    return res.send(await findUserById(id));
  } catch (error) {
    sendErrorMsg(error, res);
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  const data = { ...req.body };

  const { email } = data;
  try {
    return res.send(await findUserByEmail(email));
  } catch (error) {
    sendErrorMsg(error, res);
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const data = { ...req.body };

  const { email, password } = data;

  try {
    const result = await findUserByEmail(email);

    if (typeof result === "object" && result !== null) {
      const user = result as User;

      if (user.password == password) {
        let token = jwt.sign(
          {
            id: user.id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            age: user.age,
          },
          process.env.JWT_SECRET,
          { expiresIn: "86400s" }
        );

        return res.send({ status: 200, token: token }).send();
      } else {
        return res.send({
          error: true,
          msg: "Incorrect email or password !",
        });
      }
    } else {
      return res.send({
        error: true,
        msg: "User not found",
      });
    }
  } catch (error) {
    sendErrorMsg(error, res);
  }
};
