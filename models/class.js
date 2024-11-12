import { Schema, model } from 'mongoose';

const classSchema = new Schema({
    class_id: {
        type: String,
        required: true,
        unique: true
    },
    teacher_id: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    subject_id: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    class_name: {
        type: String,
        required: true
    },
    academic_year: {
        type: String,
        required: true
    }
});

export default model('Class', classSchema);