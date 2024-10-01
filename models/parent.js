import mongoose from "mongoose";

const parentSchema = new mongoose.Schema({
    occupation:{
        type: String,
        required: true
    },
    relationship:{
        type: String,
        required: true
    }
})

export default parentSchema;