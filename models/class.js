import mongoose from "mongoose";
import lectureSchema from "./lecture.js";

const classSchema = new mongoose.Schema({
    incharge_teacher_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    },
    class_name:{
        type: String,
        required: true
    },
    academic_year:{
        type: String,
        required: true
    },
    section:{
        type: String,
        required: true
    },
    lectures: [lectureSchema]

})

export default mongoose.model('Class', classSchema);