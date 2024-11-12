import { Router } from 'express';
const router = Router();
import Class from '../models/class.js';
import auth from '../middleware/authentication.js';
import authorize from '../middleware/authorization.js';

// Get all classes
router.get('/', auth, async (req, res) => {
    try {
        const classes = await find()
            .populate('teacher_id')
            .populate('subject_id');
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one class
router.get('/:id', auth, async (req, res) => {
    try {
        const classItem = await findById(req.params.id)
            .populate('teacher_id')
            .populate('subject_id');
        if (!classItem) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.json(classItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create class
router.post('/', auth, authorize(['admin']), async (req, res) => {
    const classItem = new Class({
        class_id: req.body.class_id,
        teacher_id: req.body.teacher_id,
        subject_id: req.body.subject_id,
        class_name: req.body.class_name,
        academic_year: req.body.academic_year
    });

    try {
        const newClass = await classItem.save();
        res.status(201).json(newClass);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update class
router.patch('/:id', auth, authorize(['admin']), async (req, res) => {
    try {
        const classItem = await findById(req.params.id);
        if (!classItem) {
            return res.status(404).json({ message: 'Class not found' });
        }

        Object.keys(req.body).forEach(key => {
            if (classItem[key] !== undefined) {
                classItem[key] = req.body[key];
            }
        });

        const updatedClass = await classItem.save();
        res.json(updatedClass);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete class
router.delete('/:id', auth, authorize(['admin']), async (req, res) => {
    try {
        const classItem = await findById(req.params.id);
        if (!classItem) {
            return res.status(404).json({ message: 'Class not found' });
        }
        await classItem.remove();
        res.json({ message: 'Class deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;