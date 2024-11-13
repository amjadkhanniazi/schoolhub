import express from 'express';
import person from '../models/person.js';
import authenticateToken from '../middleware/authentication.js';

const router = express.Router();

router.post('/add/:personId', authenticateToken, async (req, res) => {
    try {
        const personId = req.params.personId;
        const parentData = req.body; // Parent data from the form

        // Find the person by ID and push the new parent into the parents array
        const personExist = await person.findById(personId);

        if (!personExist) {
            return res.status(404).json({ error: 'Person not found' });
        }

          // check if parent data already exists
          if(personExist.Parent){
            return res.status(400).json({ Message: 'Already Exist' });
        }

        // Add the new parent to the parents array, overwrite previous parent
        personExist.Parent=parentData;

        // Save the updated person document
        await personExist.save();

        res.status(200).json(personExist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


export default router;