import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    person_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    },
    student_id: {
        type: String,
        required: true,
        unique: true
    },
    current_grade: {
        type: String,
        required: true
    },
    student_pic_url: {
        type: String
    },
    enrollment_date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Student', studentSchema);