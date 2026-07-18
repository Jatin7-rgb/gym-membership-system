# 🚀 Be More Fit - Gym Membership Management System

## Quick Start Guide

Welcome to **Be More Fit** - A modern, futuristic gym membership management system!

### 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Using the System](#using-the-system)
6. [Features Overview](#features-overview)
7. [API Endpoints](#api-endpoints)
8. [Troubleshooting](#troubleshooting)
9. [Deployment](#deployment)

---

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

To verify installation:
```bash
node --version
npm --version
```

---

## Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/Jatin7-rgb/gym-membership-system.git
cd gym-membership-system
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required packages:
- `express` - Web framework
- `sqlite3` - Local database
- `bcryptjs` - Password encryption
- `jsonwebtoken` - Authentication tokens
- `cors` - Cross-origin requests
- `dotenv` - Environment variables

---

## Configuration

### Step 1: Create Environment File
Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Or manually create `.env` with:
```
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
DATABASE_PATH=./gym_members.db
NODE_ENV=development
```

### Step 2: Customize Settings
Edit the `.env` file:
- **PORT**: Change if 5000 is already in use
- **JWT_SECRET**: Create a secure random string (at least 32 characters for production)
- **DATABASE_PATH**: Path where SQLite database will be stored
- **NODE_ENV**: Set to 'production' for deployment

---

## Running the Application

### Development Mode
```bash
npm start
```

The server will start at `http://localhost:5000`

### With Auto-Restart (using Nodemon)
```bash
npm run dev
```

**Output should show:**
```
Server running on http://localhost:5000
Connected to SQLite database at: ./gym_members.db
Users table ready
Fitness profiles table ready
Memberships table ready
Attendance table ready
```

---

## Using the System

### 🏠 Home Page
- **URL**: `http://localhost:5000/`
- View membership plans
- See gym features
- Quick links to login/signup

### 📝 Sign Up
1. Go to `http://localhost:5000/signup`
2. Fill in your details:
   - First Name
   - Last Name
   - Email
   - Phone Number
   - Password (min 6 characters)
3. Click "Create Account"
4. You'll be redirected to the fitness questionnaire

### ❓ Fitness Questionnaire
After signup, answer questions about:
- **Age, Height, Weight** - Basic measurements
- **Gym Experience** - Beginner/Intermediate/Advanced
- **Fitness Goal** - Lose Weight / Build Muscle / Endurance / Overall Fitness
- **Additional Goals** - Select all that apply
- **Health Conditions** - Any injuries or conditions

**Progress bar** shows your completion percentage

### 💳 Membership Selection
Choose from 4 membership plans:

| Plan | Duration | Cost | Features |
|------|----------|------|----------|
| **Basic** | 1 Month | ₹2,999 | Gym Access, Basic Equipment, Locker |
| **Premium** | 3 Months | ₹7,999 | All Equipment, Personal Training (2/week) |
| **Elite** | 6 Months | ₹14,999 | 24/7 Access, Personal Training (4/week), Nutrition Consultation |
| **Ultimate** | 12 Months | ₹25,999 | 24/7 Access, Unlimited Training, Recovery Services |

### 📊 User Dashboard
After membership selection:
- **Welcome Card** - Personalized greeting
- **Membership Status** - Current plan and expiry date
- **Fitness Stats** - Weight, Height, Current Goal
- **Quick Actions**:
  - Check In / Check Out
  - View Fitness Profile
  - Check Attendance
  - Upgrade Membership

### 🔐 Login
- **URL**: `http://localhost:5000/login`
- Enter registered email and password
- Access your dashboard

### 👥 Members Directory
- **URL**: `http://localhost:5000/members`
- View all registered members
- Search by name or email
- See membership details

---

## Features Overview

### ✨ Authentication & Security
- **Secure Password Hashing** using bcryptjs
- **JWT Token-based Authentication** (30-day expiration)
- **Protected Routes** - Unauthorized access redirects to login
- **Session Management** - Auto-logout on token expiration

### 🏋️ Member Management
- **Profile Creation** with personal and fitness details
- **Fitness Assessment Questionnaire** with progress tracking
- **Membership Plans** with flexible durations and pricing
- **Automatic Plan Expiry** calculation

### 📱 User-Friendly Interface
- **Futuristic Modern Design** with gradient colors
- **Responsive Layout** - Works on all devices
- **Smooth Animations** and transitions
- **Glitch Effects** on hero text
- **Floating Shapes** for visual appeal

### 💾 Data Management
- **SQLite Local Database** - No external database needed
- **Automatic Table Creation** - Schema initialized on startup
- **Member Data Persistence** - All data saved locally
- **Attendance Tracking** - Check-in/Check-out records

### 📈 Analytics
- **BMI Calculation** from height and weight
- **Membership Expiry Tracking**
- **Attendance History** (Ready for expansion)
- **Member Directory** with search functionality

---

## API Endpoints

### Authentication Endpoints

#### Sign Up
```
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+91 98765 43210"
}

Response: { token, userId, user }
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: { token, userId, user }
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer {token}

Response: { id, email, firstName, lastName, phone }
```

### Member Endpoints

#### Submit Fitness Profile
```
POST /api/members/fitness-profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "height": 175,
  "weight": 75,
  "age": 25,
  "gymExperience": "intermediate",
  "gymExperienceYears": 2,
  "fitnessGoal": "muscle_gain",
  "goals": "strength,confidence",
  "healthConditions": "No conditions"
}
```

#### Get Fitness Profile
```
GET /api/members/fitness-profile
Authorization: Bearer {token}

Response: { id, userId, height, weight, age, ... }
```

#### Get Membership Plans
```
GET /api/members/plans

Response: [
  { type: "basic", name: "Basic Plan", duration: 1, cost: 2999, features: [...] },
  ...
]
```

#### Create Membership
```
POST /api/members/membership
Authorization: Bearer {token}
Content-Type: application/json

{
  "planType": "premium"
}

Response: { message, membership }
```

#### Get User Membership
```
GET /api/members/membership
Authorization: Bearer {token}

Response: { id, userId, planType, planName, cost, ... }
```

#### Check In
```
POST /api/members/checkin
Authorization: Bearer {token}

Response: { message, checkInTime }
```

#### Check Out
```
POST /api/members/checkout
Authorization: Bearer {token}

Response: { message, checkOutTime }
```

#### Get All Members
```
GET /api/members/all

Response: [
  { id, email, firstName, lastName, phone, planName, cost, ... },
  ...
]
```

---

## Troubleshooting

### Issue: Port 5000 Already in Use
**Solution**: Change PORT in `.env` file:
```
PORT=5001
```

### Issue: Database File Not Found
**Solution**: Database is created automatically. If error persists:
```bash
rm gym_members.db
npm start
```

### Issue: JWT Secret Not Set
**Solution**: Update `.env` file:
```
JWT_SECRET=your_secure_random_string_here_minimum_32_characters_long
```

### Issue: Module Not Found
**Solution**: Reinstall dependencies:
```bash
rm -rf node_modules
npm install
```

### Issue: Cannot Read Property of Undefined
**Solution**: Ensure `.env` file exists and has all required variables

### Issue: Cors/CORS Errors
**Solution**: CORS is already enabled for localhost. For production, update:
```javascript
app.use(cors({
  origin: 'https://yourdomain.com'
}));
```

---

## Database Schema

### Users Table
```sql
id (PRIMARY KEY)
email (UNIQUE)
password (hashed)
firstName
lastName
phone
createdAt
updatedAt
```

### Fitness Profiles Table
```sql
id (PRIMARY KEY)
userId (FOREIGN KEY)
height (cm)
weight (kg)
age
gymExperience
gymExperienceYears
fitnessGoal
goals
healthConditions
createdAt
updatedAt
```

### Memberships Table
```sql
id (PRIMARY KEY)
userId (FOREIGN KEY, UNIQUE)
planType
planName
cost
startDate
endDate
status (active/expired)
renewalDate
createdAt
updatedAt
```

### Attendance Table
```sql
id (PRIMARY KEY)
userId (FOREIGN KEY)
checkInTime
checkOutTime
date
createdAt
```

---

## Deployment Guide

### Deploy to Heroku

#### Step 1: Install Heroku CLI
```bash
npm install -g heroku
heroku login
```

#### Step 2: Create Heroku App
```bash
heroku create your-app-name
```

#### Step 3: Set Environment Variables
```bash
heroku config:set JWT_SECRET=your_secure_key
heroku config:set NODE_ENV=production
```

#### Step 4: Deploy
```bash
git push heroku main
```

### Deploy to AWS/Google Cloud/DigitalOcean

#### Step 1: Create Server Instance
- Choose Ubuntu 20.04 or higher
- Minimum 1GB RAM, 1 CPU

#### Step 2: Install Dependencies
```bash
sudo apt update
sudo apt install nodejs npm git
```

#### Step 3: Clone and Setup
```bash
git clone https://github.com/Jatin7-rgb/gym-membership-system.git
cd gym-membership-system
npm install
```

#### Step 4: Configure Environment
```bash
nano .env
# Add your configuration
```

#### Step 5: Use PM2 for Auto-Start
```bash
npm install -g pm2
pm2 start server.js --name "gym-system"
pm2 startup
pm2 save
```

#### Step 6: Setup Reverse Proxy (Nginx)
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Step 7: Enable SSL (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Project Structure

```
gym-membership-system/
├── public/
│   ├── index.html              # Home page
│   ├── login.html              # Login page
│   ├── signup.html             # Signup page
│   ├── questionnaire.html      # Fitness assessment
│   ├── membership.html         # Plan selection
│   ├── dashboard.html          # User dashboard
│   ├── members.html            # Members directory
│   ├── css/
│   │   └── styles.css          # Futuristic styles
│   └── js/
│       ├── auth.js             # Auth utilities
│       └── dashboard.js        # Dashboard functions
├── routes/
│   ├── auth.js                 # Auth endpoints
│   └── members.js              # Member endpoints
├── middleware/
│   └── auth.js                 # JWT middleware
├── database.js                 # Database setup
├── server.js                   # Express server
├── package.json                # Dependencies
├── .env                        # Environment config
├── .gitignore                  # Git ignore
└── README.md                   # This file
```

---

## Technologies Used

- **Frontend**: HTML5, CSS3 (Futuristic), JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **Styling**: Custom CSS with animations and gradients

---

## Browser Compatibility

✅ Chrome (v90+)
✅ Firefox (v88+)
✅ Safari (v14+)
✅ Edge (v90+)
✅ Mobile Browsers (iOS Safari, Chrome Mobile)

---

## Security Best Practices

1. **Change JWT_SECRET** in production (minimum 32 characters)
2. **Use HTTPS** on production (SSL certificate)
3. **Keep dependencies updated**: `npm audit fix`
4. **Never commit .env** file (use .gitignore)
5. **Regular database backups** recommended
6. **Implement rate limiting** for APIs (if needed)
7. **SQL Injection** - Already protected by parameterized queries

---

## Future Enhancements

- [ ] Admin dashboard for gym management
- [ ] Email notifications for membership renewal
- [ ] SMS alerts for check-ins
- [ ] Mobile app (React Native/Flutter)
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Progress tracking with photos
- [ ] Workout plans and recommendations
- [ ] Trainer assignment and scheduling
- [ ] Class booking system
- [ ] Nutrition tracking

---

## Support & Contact

For issues or suggestions:
- 📧 Email: support@bemorefitgym.com
- 🐛 Bug Reports: [GitHub Issues](https://github.com/Jatin7-rgb/gym-membership-system/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/Jatin7-rgb/gym-membership-system/discussions)

---

## License

This project is open-source and available under the MIT License.

---

## Authors

👨‍💻 **Jatin Sanap**
👨‍💻 **Adarsh Patil**

Created with ❤️ for fitness enthusiasts and gym owners

---

## Changelog

### Version 1.0.0 (Initial Release)
- ✅ Complete authentication system
- ✅ Membership management
- ✅ Fitness questionnaire
- ✅ User dashboard
- ✅ Members directory
- ✅ SQLite database
- ✅ Futuristic UI design

---

**Happy Fitness! 💪**
