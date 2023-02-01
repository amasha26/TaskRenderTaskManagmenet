import { Response } from "express";

export const sendErrorMsg = (err:any, res:Response) => { 
    console.log(err.stack);
     return res.status(500).send({
       error: true,
       msg: "Something went wrong please try again",
     });
}
