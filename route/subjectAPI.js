import { Router } from 'express';
const router = Router();
import Subject from '../models/subject.js';
import auth from '../middleware/authentication.js';
import authorize from '../middleware/authorization.js';

// Get all subjects
router.get('/', auth, async (req, res) => {
    try {
        const subjects = await find();
        res.json(subjects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one subject
router.get('/:id', auth, async (req, res) => {
    try {
        const subject = await findById(req.params.id);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        res.json(subject);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create subject
router.post('/', auth, authorize(['admin']), async (req, res) => {
    const subject = new Subject({
        subject_id: req.body.subject_id,
        subject_name: req.body.subject_name,
        department: req.body.department,
        description: req.body.description
    });

    try {
        const newSubject = await subject.save();
        res.status(201).json(newSubject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update subject
router.patch('/:id', auth, authorize(['admin']), async (req, res) => {
    try {
        const subject = await findById(req.params.id);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        Object.keys(req.body).forEach(key => {
            if (subject[key] !== undefined) {
                subject[key] = req.body[key];
            }
        });

        const updatedSubject = await subject.save();
        res.json(updatedSubject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete subject
router.delete('/:id', auth, authorize(['admin']), async (req, res) => {
    try {
        const subject = await findById(req.params.id);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        await subject.remove();
        res.json({ message: 'Subject deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;