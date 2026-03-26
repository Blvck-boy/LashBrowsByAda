# Render Deployment Guide

## Prerequisites

1. Render account at https://render.com
2. Git repo pushed to GitHub/GitLab
3. Backend and frontend code in this repo structure

## Deployment Steps

### Option 1: Using render.yaml (Automated)

1. **Connect Repository**
   - Go to https://dashboard.render.com
   - Click "New +"
   - Select "Web Service" → Connect to GitHub repo
   - Select `lashbrows-by-ada` repo

2. **Let Render auto-detect render.yaml**
   - Render will automatically parse `render.yaml` and create all services
   - This creates 2 services + 1 database automatically

3. **Add Sensitive Environment Variables**
   - Go to each service's Settings → Environment
   - Add these manually (not in render.yaml for security):
     - `PAYSTACK_SECRET_KEY` (from Paystack dashboard)
     - `EMAIL_USER` (Gmail address)
     - `EMAIL_PASS` (Gmail app password)
     - `TECHNICIAN_EMAIL` (Ada's email)
     - `CLIENT_EMAIL_FROM` (noreply address)

### Option 2: Manual Setup (if render.yaml doesn't work)

#### Frontend Service
1. **Create Static Site**
   - Service: Static Site
   - Name: `lashbrows-frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - Environment: Add `VITE_BACKEND_URL=https://lashbrows-backend.onrender.com`

#### Backend Service
1. **Create Web Service**
   - Service: Web Service
   - Name: `lashbrows-backend`
   - Environment: Node.js
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables:
     ```
     PORT=5000
     MONGODB_URI=(auto-filled from Render PostgreSQL)
     PAYSTACK_SECRET_KEY=(from Paystack)
     EMAIL_USER=(your email)
     EMAIL_PASS=(app password)
     TECHNICIAN_EMAIL=(Ada's email)
     CLIENT_EMAIL_FROM=(noreply email)
     FRONTEND_URL=https://lashbrows-frontend.onrender.com
     ```

#### Database
1. **Create MongoDB**
   - Service: PostgreSQL (or MongoDB if available)
   - Name: `lashbrows-db`
   - Plan: Free tier

## Environment Variables Reference

| Variable | Value | Required | Secret |
|----------|-------|----------|--------|
| MONGODB_URI | Auto from database | Yes | Yes |
| PORT | 5000 | Yes | No |
| PAYSTACK_SECRET_KEY | From Paystack dashboard | Yes | **Yes** |
| EMAIL_USER | Gmail address | Yes | **Yes** |
| EMAIL_PASS | Gmail app password | Yes | **Yes** |
| TECHNICIAN_EMAIL | Ada's email | Yes | No |
| CLIENT_EMAIL_FROM | noreply@domain | Yes | No |
| FRONTEND_URL | https://lashbrows-frontend.onrender.com | Yes | No |
| VITE_BACKEND_URL | https://lashbrows-backend.onrender.com | Yes | No |

## Secrets Setup

### 1. Paystack Secret Key
- Go to https://dashboard.paystack.com
- Copy your secret key
- Add to backend service environment variables

### 2. Gmail App Password
- Enable 2FA on your Gmail account
- Go to https://myaccount.google.com/apppasswords
- Generate app password for "Mail"
- Use this as `EMAIL_PASS`

### 3. Environment Variables Best Practice
- **Never** commit secrets to GitHub
- Add to `.gitignore`: `.env`, `.env.local`, `.env.*.local`
- Only set them in Render dashboard under "Environment"

## Testing After Deployment

1. **Frontend URL**: https://lashbrows-frontend.onrender.com
2. **Backend Health**: https://lashbrows-backend.onrender.com/api/bookings
3. **Test Booking Flow**:
   - Go to frontend
   - Try to create a booking
   - Should see payment redirect

## Debugging

### Build Failed
- Check Render build logs for errors
- Ensure `npm run build` works locally
- Check `package.json` has correct scripts

### Service Can't Start
- Check backend logs: `npm start` works locally?
- Verify environment variables are set
- Check MongoDB connection string

### 502 Bad Gateway
- Backend service crashed
- Check backend logs for errors
- Verify API endpoint paths

### CORS Errors
- Backend CORS not configured for frontend domain
- Update `backend/server.js` with production domain

## Production Checklist

- [ ] Paystack live keys (not test)
- [ ] Real email credentials
- [ ] MongoDB backup configured
- [ ] CORS whitelist updated
- [ ] All environment variables set in Render
- [ ] SSL certificate (Render auto-provides)
- [ ] Custom domain setup (optional)

## Useful Links

- Render Docs: https://render.com/docs
- Paystack Docs: https://paystack.com/docs
- Vite Build: https://vitejs.dev/guide/build.html
