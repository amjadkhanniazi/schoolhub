// route/recordsAPI.js

import { Router } from 'express';
import LibraryBorrowing, { Book, DisciplinaryRecord, HealthRecord } from '../models/records.js';
import auth from '../middleware/authentication.js';
import authorize from '../middleware/authorization.js';

// Library Router
const libraryRouter = Router();

// Book Routes
libraryRouter.get('/books', auth, async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

libraryRouter.post('/books', auth, authorize(['admin', 'librarian']), async (req, res) => {
    const book = new Book({
        book_id: req.body.book_id,
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Library Borrowing Routes
libraryRouter.get('/borrowings', auth, authorize(['admin', 'librarian']), async (req, res) => {
    try {
        const borrowings = await LibraryBorrowing.find()
            .populate('student_id')
            .populate('book_id');
        res.json(borrowings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

libraryRouter.post('/borrowings', auth, authorize(['admin', 'librarian']), async (req, res) => {
    const borrowing = new LibraryBorrowing({
        borrow_id: req.body.borrow_id,
        student_id: req.body.student_id,
        book_id: req.body.book_id,
        borrow_date: req.body.borrow_date,
        return_date: req.body.return_date
    });

    try {
        const newBorrowing = await borrowing.save();
        res.status(201).json(newBorrowing);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Disciplinary Router
const disciplinaryRouter = Router();

disciplinaryRouter.get('/', auth, authorize(['admin', 'teacher']), async (req, res) => {
    try {
        const records = await DisciplinaryRecord.find().populate('student_id');
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

disciplinaryRouter.post('/', auth, authorize(['admin', 'teacher']), async (req, res) => {
    const record = new DisciplinaryRecord({
        record_id: req.body.record_id,
        student_id: req.body.student_id,
        description: req.body.description,
        action_taken: req.body.action_taken
    });

    try {
        const newRecord = await record.save();
        res.status(201).json(newRecord);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Health Router
const healthRouter = Router();

healthRouter.get('/', auth, authorize(['admin', 'nurse']), async (req, res) => {
    try {
        const records = await HealthRecord.find().populate('student_id');
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

healthRouter.post('/', auth, authorize(['admin', 'nurse']), async (req, res) => {
    const record = new HealthRecord({
        record_id: req.body.record_id,
        student_id: req.body.student_id,
        medical_condition: req.body.medical_condition,
        description: req.body.description,
        medications: req.body.medications,
        doctor_contact: req.body.doctor_contact
    });

    try {
        const newRecord = await record.save();
        res.status(201).json(newRecord);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Export each router individually
export { libraryRouter, disciplinaryRouter, healthRouter };
