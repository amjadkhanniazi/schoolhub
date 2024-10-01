import express from 'express';
import person from '../models/person.js';


const router = express.Router();

router.post('/add/:personId', async (req, res) => {
    try {
        const personId = req.params.personId;
        const addressData = req.body; // Address data from the form

        // Find the person by ID and push the new address into the addresses array
        const personExist = await person.findById(personId);

        if (!personExist) {
            return res.status(404).json({ error: 'Person not found' });
        }

        // Add the new address to the addresses array, overwrite previous address
        personExist.Address=addressData;

        // Save the updated person document
        await personExist.save();

        res.status(200).json(personExist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Delete Address

router.delete('/delete/:personId', async (req, res) => {
    try {
        const personId = req.params.personId;

        // Find the person by ID
        const personExist = await person.findById(personId);

        if (!personExist) {
            return res.status(404).json({ error: 'Person not found' });
        }

        // Remove the address from the addresses array
        personExist.Address = null;

        // Save the updated person document
        await personExist.save();

        res.status(200).json('Address Deleted Successfully');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


export default router;