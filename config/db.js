import mongoose from "mongoose";
import config from "./config.js";

async function connectDB(){
    const client= mongoose.connect(config.MongoUrl);

    try{
        await client;
        console.log("Connected to the database");
    }
    catch(err){
        console.log({message: "Error connecting to the database", error: err});
    }
}

export default connectDB;