import express from "express";
import {saveCode,loadCode} from "../controllers/compilerController";

export const compilerRouter = express.Router();
compilerRouter.get("/",(req,res)=>{
  return res.send("reached");
});
compilerRouter.post("/", (req: Request, res: Response) => {
  const data = req.body;
  return res.json({ message: "POST request received", data });
});
compilerRouter.post("/save",saveCode);
compilerRouter.post("/load",loadCode);
