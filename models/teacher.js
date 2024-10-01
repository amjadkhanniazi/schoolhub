import mongoose from "mongoose";

const teacherSchema= new mongoose.Schema({
    department:{
        type: String,
        required: true
    },
    hire_date:{
        type: String,
        required: true
    }
})

export default teacherSchema;