import { Schema, model } from 'mongoose';

const subjectSchema = new Schema({
    subject_id: {
        type: String,
        required: true,
        unique: true
    },
    subject_name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

export default model('Subject', subjectSchema);