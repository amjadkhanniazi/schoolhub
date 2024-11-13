import express from 'express';
import person from '../models/person.js';
import authenticateToken from '../middleware/authentication.js';


const router = express.Router();

router.post('/add/:personId', authenticateToken, async (req, res) => {
    try {
        const personId = req.params.personId;
        const teacherData = req.body; // Teacher data from the form


        // Find the person by ID and push the new teacher into the teachers array
        const personExist = await person.findById(personId);

        if (!personExist) {
            return res.status(404).json({ error: 'Person not found' });
        }

        // check if teacher data already exists
        // if (personExist.Teacher) {
        //     return res.status(400).json({ Message: 'Already Updated' });
        // }

        // Add the new teacher to the teachers array, overwrite previous teacher
        personExist.Teacher = teacherData;

        // Save the updated person document
        await personExist.save();

        res.status(200).json(personExist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


export default router;