// libraryBorrowing.js
import { Schema, model } from 'mongoose';

const libraryBorrowingSchema = new Schema({
    borrow_id: {
        type: String,
        required: true,
        unique: true
    },
    student_id: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    book_id: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    borrow_date: {
        type: Date,
        required: true
    },
    return_date: {
        type: Date,
        required: true
    }
});

// models/book.js
const bookSchema = new Schema({
    book_id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    }
});

// models/disciplinaryRecord.js
const disciplinaryRecordSchema = new Schema({
    record_id: {
        type: String,
        required: true,
        unique: true
    },
    student_id: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    action_taken: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// models/healthRecord.js
const healthRecordSchema = new Schema({
    record_id: {
        type: String,
        required: true,
        unique: true
    },
    student_id: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    medical_condition: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    medications: {
        type: String
    },
    doctor_contact: {
        type: String
    }
});

export default model('LibraryBorrowing', libraryBorrowingSchema);
export const Book = model('Book', bookSchema);
export const DisciplinaryRecord = model('DisciplinaryRecord', disciplinaryRecordSchema);
export const HealthRecord = model('HealthRecord', healthRecordSchema);