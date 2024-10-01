import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    day:{
        type: String,
        required: true
    },
    start_time:{
        type: String,
        required: true
    },
    end_time:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    teacher_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    }
})

export default lectureSchema;