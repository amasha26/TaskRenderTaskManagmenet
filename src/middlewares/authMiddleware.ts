import { NextFunction, Request, Response } from "express";
var jwt = require("jsonwebtoken");

export const verifyTokenExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (token) {
      return next();
    } else {
      res.send({ status: 401, message: "Unauthorized request" });
    }
  } catch (error) {
    console.log(error);
    res.send({ erro: "Something went wrong" });
  }
};

export const userAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verify = verifyToken(token);
    if (verify) {
      res.send(verify);
    } else {
      res.send({ error: "Unauthorized request" });
    }
  } catch (error) {
    res.status(401).send({ error: "Unauthorized request" });
  }
};

const verifyToken = (token: string) => {
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);

    if (verify) {
      return verify;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
