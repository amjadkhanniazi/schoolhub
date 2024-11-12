import { Router } from 'express';
const router = Router();
import Student from '../models/student.js';
import auth from '../middleware/authentication.js';
import authorize from '../middleware/authorization.js';

// Get all students
router.get('/', auth, authorize(['admin', 'teacher']), async (req, res) => {
    try {
        const students = await find().populate('person_id');
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one student
router.get('/:id', auth, authorize(['admin', 'teacher']), async (req, res) => {
    try {
        const student = await findById(req.params.id).populate('person_id');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create student
router.post('/', auth, authorize(['admin']), async (req, res) => {
    const student = new Student({
        person_id: req.body.person_id,
        student_id: req.body.student_id,
        current_grade: req.body.current_grade,
        student_pic_url: req.body.student_pic_url
    });

    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update student
router.patch('/:id', auth, authorize(['admin']), async (req, res) => {
    try {
        const student = await findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        Object.keys(req.body).forEach(key => {
            if (student[key] !== undefined) {
                student[key] = req.body[key];
            }
        });

        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete student
router.delete('/:id', auth, authorize(['admin']), async (req, res) => {
    try {
        const student = await findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        await student.remove();
        res.json({ message: 'Student deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;