const express = require('express');
const { body, validationResult } = require('express-validator');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// Create booking
router.post('/', [
  body('clientName').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('clientEmail').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('clientPhone').custom((value) => {
    if (!/^(\+234|234|0)[789]\d{9}$/.test(value.replace(/\s+/g, ''))) {
      throw new Error('Invalid Nigerian phone number format');
    }
    return true;
  }),
  body('services').isObject().withMessage('Services must be an object'),
  body('date').isISO8601().withMessage('Valid date required'),
  body('time').isString().notEmpty().withMessage('Time slot required'),
  body('totalAmount').isNumeric().withMessage('Total amount must be a number')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, bookingController.createBooking);

// Confirm payment (webhook or callback)
router.post('/confirm', bookingController.confirmPayment);

// List bookings
router.get('/', bookingController.listBookings);

// Get booking by ID
router.get('/:id', bookingController.getBooking);

module.exports = router;