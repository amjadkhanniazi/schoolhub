import { body } from 'express-validator';


// Validation middleware
const validate = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
        body('phone_number')
        .isNumeric().withMessage('Phone number must contain only numbers')
        .isLength({ min: 11, max: 11 }).withMessage('Phone number must be exactly 11 digits long'),
];

export default validate;