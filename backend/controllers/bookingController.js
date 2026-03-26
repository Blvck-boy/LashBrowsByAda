const Booking = require('../models/Booking');
const Paystack = require('paystack-api')(process.env.PAYSTACK_SECRET_KEY);
const nodemailer = require('nodemailer');

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.createBooking = async (req, res) => {
  try {
    const { clientName, clientEmail, clientPhone, services, date, time, totalAmount } = req.body;

    // Calculate deposit (50%)
    const depositAmount = Math.round(totalAmount * 0.5);

    const booking = new Booking({
      clientName,
      clientEmail,
      clientPhone,
      services,
      date,
      time,
      totalAmount,
      depositAmount
    });

    await booking.save();

    // Initialize Paystack payment
    const paymentData = {
      amount: depositAmount * 100, // Paystack expects kobo
      email: clientEmail,
      reference: `booking-${booking._id}`,
      callback_url: `${process.env.FRONTEND_URL}/booking/confirm/${booking._id}`,
      metadata: {
        bookingId: booking._id,
        custom_fields: [
          {
            display_name: "Client Name",
            variable_name: "client_name",
            value: clientName
          }
        ]
      }
    };

    const paymentResponse = await Paystack.transaction.initialize(paymentData);

    booking.paystackReference = paymentResponse.data.reference;
    await booking.save();

    res.status(201).json({
      message: 'Booking created, proceed to payment',
      booking: booking._id,
      paymentUrl: paymentResponse.data.authorization_url,
      reference: paymentResponse.data.reference
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const { reference } = req.body;

    // Verify payment with Paystack
    const verification = await Paystack.transaction.verify(reference);

    if (verification.data.status === 'success') {
      const bookingId = reference.split('-')[1];
      const booking = await Booking.findById(bookingId);

      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      booking.paymentStatus = 'paid';
      booking.status = 'confirmed';
      booking.paystackTransactionId = verification.data.id;
      await booking.save();

      // Send emails
      await sendConfirmationEmails(booking);

      res.json({ message: 'Payment confirmed, booking confirmed' });
    } else {
      res.status(400).json({ message: 'Payment failed' });
    }
  } catch (error) {
    console.error('Payment confirmation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('List bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Send confirmation emails
async function sendConfirmationEmails(booking) {
  const servicesList = [];
  if (booking.services.lash) servicesList.push(booking.services.lash.name);
  if (booking.services.brow) servicesList.push(booking.services.brow.name);
  booking.services.extras.forEach(extra => servicesList.push(extra.name));

  const clientEmailHtml = `
    <h2>Booking Confirmed!</h2>
    <p>Dear ${booking.clientName},</p>
    <p>Your booking has been confirmed. Here are the details:</p>
    <ul>
      <li><strong>Services:</strong> ${servicesList.join(', ')}</li>
      <li><strong>Date:</strong> ${booking.date}</li>
      <li><strong>Time:</strong> ${booking.time}</li>
      <li><strong>Total Amount:</strong> ₦${booking.totalAmount.toLocaleString()}</li>
      <li><strong>Deposit Paid:</strong> ₦${booking.depositAmount.toLocaleString()}</li>
    </ul>
    <p>Please arrive 10 minutes early. We look forward to seeing you!</p>
    <p>Best regards,<br>Lash Brows by Ada</p>
  `;

  const technicianEmailHtml = `
    <h2>New Booking Alert!</h2>
    <p>A new booking has been made:</p>
    <ul>
      <li><strong>Client:</strong> ${booking.clientName}</li>
      <li><strong>Email:</strong> ${booking.clientEmail}</li>
      <li><strong>Phone:</strong> ${booking.clientPhone}</li>
      <li><strong>Services:</strong> ${servicesList.join(', ')}</li>
      <li><strong>Date:</strong> ${booking.date}</li>
      <li><strong>Time:</strong> ${booking.time}</li>
      <li><strong>Total Amount:</strong> ₦${booking.totalAmount.toLocaleString()}</li>
      <li><strong>Deposit Paid:</strong> ₦${booking.depositAmount.toLocaleString()}</li>
    </ul>
  `;

  try {
    await transporter.sendMail({
      from: process.env.CLIENT_EMAIL_FROM,
      to: booking.clientEmail,
      subject: 'Booking Confirmation - Lash Brows by Ada',
      html: clientEmailHtml
    });

    await transporter.sendMail({
      from: process.env.CLIENT_EMAIL_FROM,
      to: process.env.TECHNICIAN_EMAIL,
      subject: 'New Booking Notification',
      html: technicianEmailHtml
    });
  } catch (error) {
    console.error('Email sending error:', error);
  }
}