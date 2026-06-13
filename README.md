# RBAC Project (Role-Based Access Control)

A full-stack RBAC application with OTP-based login verification.

## Live Demo
- **Frontend:** https://rbac-frontend-zeta.vercel.app
- **Backend:** https://rbac-backend-tau.vercel.app

## Test Credentials

### Admin Account
- **Email:** thecrazyshakir2855@gmail.com
- **Password:** 123456
- **Role:** Admin

## Features
- JWT Authentication
- OTP Verification via Email (2FA on Login)
- Role-Based Access Control (Admin, User, Software Developer, Technical Support, Intern)
- Protected Routes
- Admin Dashboard

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Auth:** JWT, Bcrypt
- **Email:** Resend API
- **Deployment:** Vercel

## Setup Instructions

### Backend
1. Clone the repo
2. Run `npm install`
3. Create `.env` file with:
   - MONGO_URI
   - JWT_SECRET
   - RESEND_API_KEY
4. Run `node index.js`

### Frontend
1. Clone the repo
2. Run `npm install`
3. Run `npm run dev`
