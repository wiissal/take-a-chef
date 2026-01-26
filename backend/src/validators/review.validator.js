const { body } = require('express-validator');

const createReviewValidator = [
  body('booking_id')
    .notEmpty().withMessage('Booking ID is required')
    .isInt({ min: 1 }).withMessage('Booking ID must be a positive integer'),
  
  body('rating')
    .notEmpty().withMessage('Rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  
  body('comment')
    .optional()
    .isString().withMessage('Comment must be a string')
    .isLength({ max: 1000 }).withMessage('Comment cannot exceed 1000 characters')
];

module.exports = {
  createReviewValidator
};