const mongoose = require('mongoose');

const traineeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Support +234 formats and Nigerian phone numbers
        return /^(\+234|234|0)[789]\d{9}$/.test(v.replace(/\s+/g, ''));
      },
      message: 'Invalid Nigerian phone number format'
    }
  },
  experienceLevel: {
    type: String,
    required: true,
    enum: ['beginner', 'some', 'intermediate', 'advanced']
  },
  role: {
    type: String,
    default: 'trainee'
  },
  registeredAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Trainee', traineeSchema);