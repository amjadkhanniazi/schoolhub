import express from 'express';
import classes from '../models/class.js';

const router = express.Router();


router.post('/add', async (req, res) => {
    try {
        const classData = req.body; // Class data from the form

        // Create a new class document
        const newClass = new classes(classData);

        // Save the class document
        await newClass.save();

        res.status(200).json(newClass);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

export default router;