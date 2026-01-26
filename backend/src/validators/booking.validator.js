const { body, param } = require('express-validator');

const createBookingValidator = [
  body('chef_id')
    .notEmpty().withMessage('Chef ID is required')
    .isInt({ min: 1 }).withMessage('Chef ID must be a positive integer'),
  
  body('booking_date')
    .notEmpty().withMessage('Booking date is required')
    .isISO8601().withMessage('Invalid date format')
    .custom((value) => {
      const bookingDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (bookingDate < today) {
        throw new Error('Booking date cannot be in the past');
      }
      return true;
    }),
  
  body('number_of_guests')
    .notEmpty().withMessage('Number of guests is required')
    .isInt({ min: 1, max: 50 }).withMessage('Number of guests must be between 1 and 50'),
  
  body('preferences')
    .optional()
    .isString().withMessage('Preferences must be a string')
    .isLength({ max: 500 }).withMessage('Preferences cannot exceed 500 characters')
];

const updateBookingValidator = [
  param('id')
    .isInt({ min: 1 }).withMessage('Booking ID must be a positive integer'),
  
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['pending', 'confirmed', 'completed', 'cancelled'])
    .withMessage('Status must be pending, confirmed, completed, or cancelled')
];

const bookingIdValidator = [
  param('id')
    .isInt({ min: 1 }).withMessage('Booking ID must be a positive integer')
];

module.exports = {
  createBookingValidator,
  updateBookingValidator,
  bookingIdValidator
};
