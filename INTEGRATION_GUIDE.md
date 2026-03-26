# Frontend-Backend Integration Guide

## Overview

The frontend is now fully integrated with the Node.js backend for:
- **Booking System**: Direct API calls with Paystack payment flow
- **Trainee Registration**: Direct API calls with email validation

## Frontend Changes

### 1. **BookingSection.tsx**
- Replaced WhatsApp flow with backend API call
- Added client info form (name, email, phone)
- Integrated Paystack payment redirect
- Added error handling and loading states

**Flow:**
1. User selects services, date, and time
2. Fill in name, email, phone
3. Click "Proceed to Payment"
4. Backend creates booking and initializes Paystack
5. User redirected to Paystack payment page
6. Upon successful payment, booking is confirmed and emails sent

### 2. **TrainingSection.tsx**
- Replaced WhatsApp flow with backend API call
- Added validation and error messages
- Added success confirmation screen with extended messaging

**Flow:**
1. User fills registration form (name, email, phone, experience)
2. Click "Register for Training"
3. Backend validates and saves trainee
4. Success message displayed

### 3. **New API Service Layer** (`src/services/api.ts`)
- Centralized API calls for Bookings and Trainees
- Type-safe request/response interfaces
- Error handling
- Configurable backend URL via environment variable

## Environment Setup

### Frontend (.env.local)
```
VITE_BACKEND_URL=http://localhost:5000
```

For production:
```
VITE_BACKEND_URL=https://your-api-domain.com
```

### Backend (.env)
Already configured with:
- `MONGODB_URI`
- `PAYSTACK_SECRET_KEY`
- `EMAIL_USER` and `EMAIL_PASS`
- `TECHNICIAN_EMAIL`
- `CLIENT_EMAIL_FROM`
- `FRONTEND_URL`

## How to Run

### 1. Start Backend
```bash
cd backend
npm run dev
```
Server will run on `http://localhost:5000`

### 2. Start Frontend
```bash
npm run dev
```
Frontend will run on `http://localhost:5173`

## API Endpoints Used

### Bookings
- `POST /api/bookings` - Create booking with Paystack payment init
- `GET /api/bookings` - List all bookings
- `GET /api/bookings/:id` - Get specific booking
- `POST /api/bookings/confirm` - Confirm payment

### Trainees
- `POST /api/trainees` - Register trainee
- `GET /api/trainees` - List all trainees

## Features Implemented

✅ **Nigerian Phone Validation** (+234, 234, 0 formats)  
✅ **Paystack Integration** - 50% deposit payment  
✅ **Email Notifications** - Client & technician confirmation  
✅ **Client Info Collection** - Name, email, phone fields  
✅ **Error Handling** - User-friendly error messages  
✅ **Loading States** - Visual feedback during processing  
✅ **Form Validation** - All required fields validated  

## Testing the Flow

### Test Booking Creation
1. Go to Booking section
2. Select services, date, time
3. Fill client info
4. Click "Proceed to Payment"
5. Should redirect to Paystack (or show error if API fails)

### Test Trainee Registration
1. Go to Training section
2. Fill registration form
3. Click "Register for Training"
4. Should show success message

## Troubleshooting

### CORS Errors
- Ensure backend CORS is configured for frontend origin
- In `backend/server.js`, CORS is open; in production, restrict to your domain

### API Not Responding
- Check backend is running: `http://localhost:5000/api/bookings`
- Check `.env.local` has correct `VITE_BACKEND_URL`
- Check MongoDB is connected

### Paystack Payment Not Working
- Verify `PAYSTACK_SECRET_KEY` in backend `.env`
- Ensure it's not a test/inactive key
- Check callback URL in `.env`: `FRONTEND_URL`

## Security Notes

- MongoDB connection string is **never exposed** to frontend
- Phone numbers stored securely server-side only
- Email credentials stored in backend `.env` only
- Paystack verification happens server-side
- All validation happens both client and server-side

## Next Steps

1. Configure real Paystack keys (production)
2. Set up email credentials (Gmail, SendGrid, etc.)
3. Configure production database
4. Deploy backend and frontend
5. Update `FRONTEND_URL` in backend `.env` for production domain
