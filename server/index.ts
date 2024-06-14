import express from "express";
import cors from "cors";
import {config} from "dotenv";
import { dbConnect } from "./src/lib/dbConnect";
import { compilerRouter } from "./src/routes/compilerRouter";
const app = express();

app.use(cors(
    {
        origin : true,
        credentials : true,
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
config();
app.use("/compiler",compilerRouter);
app.get("/", (req, res) => {
    return res.status(200).send("ok");
});
dbConnect();

app.listen(4000,()=>{
    console.log("listening on port 4000");
})
