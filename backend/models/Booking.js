const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number
}, { _id: false });

const bookingSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true
  },
  clientEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  clientPhone: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^(\+234|234|0)[789]\d{9}$/.test(v.replace(/\s+/g, ''));
      },
      message: 'Invalid Nigerian phone number format'
    }
  },
  services: {
    lash: serviceSchema,
    brow: serviceSchema,
    extras: [serviceSchema]
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  depositAmount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  paystackReference: {
    type: String
  },
  paystackTransactionId: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt on save
bookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);