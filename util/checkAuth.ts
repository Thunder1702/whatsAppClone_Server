import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

const privateKEY = fs.readFileSync(
  path.join(__dirname, "../private.key"),
  "utf8"
);

export function checkAuth(req: any, res: Response, next: NextFunction) {
  const token:any = req.headers.authorization;//.split(" ")[1];
  //console.log(req.headers);
  try {
    if (!req.headers.authorization) {
      console.log("header authorization not set");
      res.sendStatus(403);
      return;
    }
    // bearer <asdasdAsd>
    
    //console.log(token)
    // throws error if invalid
    let payload: any = jwt.verify(token, privateKEY);
    //console.log(payload);
    req.user = { username: payload.user};
    next();
  } catch (err) {
    //res.send(err.message);
    console.log(err);
    console.log("token failede!!!!!!!!!!!!!!!!!");
    res.status(410).json({message: " Token Expired"});
  }
}
