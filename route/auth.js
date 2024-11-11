import express from 'express';
import user from '../models/user.js';
import {validationResult} from 'express-validator';
import validate from '../middleware/validateSignUp.js';

const router = express.Router();
// Enum for user roles
const UserRoles = {
    ADMIN: 'admin',
    PARENT: 'parent',
    TEACHER: 'teacher'
    // Add other roles as needed
};

// Generic registration function
async function registerUser(userData, role) {
    const { email, password, phone_number } = userData;
    const newUser = new user({ password, email, phone_number, role });
    await newUser.save();
    return newUser;
}

// Admin Registration API
router.post('/admin/register', validate, async (req, res) => {

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


    try {
        await registerUser(req.body, UserRoles.ADMIN);
        res.status(201).json({ message: 'Admin user created' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Parent Registration API
router.post('/parent/register', validate, async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        await registerUser(req.body, UserRoles.PARENT);
        res.status(201).json({ message: 'Parent user created' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Teacher Registration API
router.post('/teacher/register', validate, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await registerUser(req.body, UserRoles.TEACHER);
        res.status(201).json({ message: 'Teacher user created' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = await user.findOne({ email });
        if (!newUser) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await newUser.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = newUser.getToken();
        res.json({token: token, user_id: newUser._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;