# Lash Brows by Ada - Backend

Node.js backend for Lash Brows by Ada web application.

## Features

- **Bookings**: Handle appointment bookings with Paystack payment integration
- **Trainee Registration**: Register trainees for training programs
- **Email Notifications**: Send confirmation emails to clients and technicians
- **Phone Validation**: Nigerian phone number validation (+234 formats)

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- Paystack API for payments
- Nodemailer for emails
- Express Validator for input validation

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/lashbrows
   PORT=5000
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-password
   PAYSTACK_SECRET_KEY=your-paystack-secret-key
   TECHNICIAN_EMAIL=ada@example.com
   CLIENT_EMAIL_FROM=noreply@lashbrows.com
   FRONTEND_URL=http://localhost:5173
   ```

3. Start MongoDB locally or update MONGODB_URI for your database.

4. Run the server:
   ```bash
   npm start
   ```

   For development:
   ```bash
   npm run dev
   ```

## API Endpoints

### Bookings

- `POST /api/bookings` - Create a new booking
- `POST /api/bookings/confirm` - Confirm payment
- `GET /api/bookings/:id` - Get booking details

### Trainees

- `POST /api/trainees` - Register a new trainee

## Booking Flow

1. Client selects services and submits booking form
2. Backend creates booking record and initializes Paystack payment
3. Client is redirected to Paystack for 50% deposit payment
4. Upon successful payment, booking is confirmed
5. Email notifications are sent to client and technician

## Phone Number Validation

Supports Nigerian phone formats:
- +234XXXXXXXXXX
- 234XXXXXXXXXX
- 0XXXXXXXXXX

Where X is a digit, and the first digit after country code/area code is 7, 8, or 9.