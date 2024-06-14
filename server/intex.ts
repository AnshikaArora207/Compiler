import express from "express";
import cors from "cors";
import {config} from "dotenv";
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRouter";
const app = express();

app.use(cors());
app.use(express.json());
config();
app.use("/compiler",compilerRouter);
dbConnect();

app.listen(4000,()=>{
    console.log("listening on port 4000");
})
