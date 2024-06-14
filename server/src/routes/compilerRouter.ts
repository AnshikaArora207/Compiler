import express from "express";
import {saveCode,loadCode} from "../controllers/compilerController";

export const compilerRouter = express.Router();
compilerRouter.get("/",(req,res)=>{
  return res.send("reached");
});
compilerRouter.post("/save",saveCode);
compilerRouter.post("/load",loadCode);
