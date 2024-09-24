import { body } from 'express-validator';

// Validation middleware for postal code only
const validatePostalCode = [
    body('postal_code')
        .isNumeric().withMessage('Postal Code must contain only numbers')
        .isLength({ min: 5, max: 5 }).withMessage('Postal Code must be exactly 5 digits long'),
];

export default validatePostalCode;
