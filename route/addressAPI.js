import express from 'express';
import address from '../models/address.js';
import {validationResult} from 'express-validator';
import validatePostalCode from '../middleware/validatePostCode.js';
import person from '../models/person.js';
import authenticateToken from '../middleware/authentication.js';


const router = express.Router();

// CREATE a new address
router.post('/new', authenticateToken, validatePostalCode, async (req, res) => {

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    try{
        const {house_no, street, town, mohallah, city, postal_code, province, country, description} = req.body;
        const p_id= await person.findOne({user:req.user.id})
        const newAddress = new address({
            house_no,
            street,
            town,
            mohallah,
            city,
            postal_code,
            province,
            country,
            description,
            person_id: p_id._id
        });
        await newAddress.save();
        res.status(201).json('Address Added Successfully');
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
})

//

export default router;