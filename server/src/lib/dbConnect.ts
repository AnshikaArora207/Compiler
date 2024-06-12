import mongoose from "mongoose"

export const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI!,{
            dbName : "Compiler",
        });
        console.log("connected to db");
    } catch (error) {
        console.log("error connecting to db");
    }
}