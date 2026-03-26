const express = require('express');
const { body, validationResult } = require('express-validator');
const traineeController = require('../controllers/traineeController');

const router = express.Router();

// Register trainee
router.post('/', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('phone').custom((value) => {
    if (!/^(\+234|234|0)[789]\d{9}$/.test(value.replace(/\s+/g, ''))) {
      throw new Error('Invalid Nigerian phone number format');
    }
    return true;
  }),
  body('experienceLevel').isIn(['beginner', 'some', 'intermediate', 'advanced']).withMessage('Invalid experience level')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, traineeController.registerTrainee);

router.get('/', traineeController.listTrainees);

module.exports = router;