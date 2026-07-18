# 🚀 Quick Start - 5 Minutes to Launch!

## TL;DR - Get Running in 5 Steps

### 1️⃣ Install Node.js
Download and install from: https://nodejs.org/

### 2️⃣ Clone & Setup
```bash
git clone https://github.com/Jatin7-rgb/gym-membership-system.git
cd gym-membership-system
npm install
```

### 3️⃣ Create .env File
```bash
# Copy the example
cp .env.example .env

# Or create manually with:
# PORT=5000
# JWT_SECRET=your_secret_key_here_change_in_production
# DATABASE_PATH=./gym_members.db
# NODE_ENV=development
```

### 4️⃣ Start Server
```bash
npm start
```

### 5️⃣ Open in Browser
Visit: **http://localhost:5000**

---

## 🎯 Test the System

### Create Test Account
1. Click "Sign Up"
2. Fill in details:
   - Email: `test@example.com`
   - Password: `test123`
   - Name: `Test User`
3. Complete fitness questionnaire
4. Select a membership plan

### Admin Check
Visit: **http://localhost:5000/members** to see all registered members

---

## 📊 Membership Plans (Indian Pricing)

| Plan | Price | Duration |
|------|-------|----------|
| Basic | ₹2,999 | 1 Month |
| Premium | ₹7,999 | 3 Months |
| Elite | ₹14,999 | 6 Months |
| Ultimate | ₹25,999 | 12 Months |

---

## 🛑 Stop Server
Press `CTRL + C` in terminal

---

## ❓ Need Help?

**Port already in use?**
- Edit `.env` and change `PORT=5000` to `PORT=5001`

**Database error?**
```bash
rm gym_members.db
npm start
```

**Module not found?**
```bash
npm install
```

---

## 📚 Full Documentation
See `SETUP.md` for complete guide including:
- ✅ Installation
- ✅ Configuration
- ✅ API Endpoints
- ✅ Database Schema
- ✅ Deployment Guide
- ✅ Troubleshooting

---

## 🎨 Features at a Glance

✨ **Futuristic Modern Design** - Gradient colors, smooth animations
🔐 **Secure Authentication** - JWT tokens, password hashing
💾 **Local Database** - SQLite, no external DB needed
📱 **Responsive** - Works on mobile, tablet, desktop
🎯 **Fitness Assessment** - Questionnaire after signup
💳 **Membership Plans** - 4 tier system with pricing
📊 **Dashboard** - View profile, track membership
👥 **Member Directory** - See all gym members

---

## 📱 Pages Available

- 🏠 **Home**: `http://localhost:5000/`
- 📝 **Sign Up**: `http://localhost:5000/signup`
- 🔐 **Login**: `http://localhost:5000/login`
- ❓ **Questionnaire**: `http://localhost:5000/questionnaire`
- 💳 **Membership**: `http://localhost:5000/membership`
- 📊 **Dashboard**: `http://localhost:5000/dashboard`
- 👥 **Members**: `http://localhost:5000/members`

---

## 💡 Pro Tips

1. **Remember credentials** after signup for testing
2. **Change JWT_SECRET** before production deployment
3. **Database auto-creates** on first run
4. **No login required** to view home page or members list
5. **Protected pages** redirect to login if not authenticated

---

## 🚀 Ready for Production?

1. Update JWT_SECRET in `.env`
2. Set NODE_ENV=production
3. Deploy using SETUP.md guide
4. Use Heroku, AWS, or DigitalOcean

---

**Created by:** Jatin Sanap & Adarsh Patil  
**Version:** 1.0.0  
**License:** MIT

Happy Fitness! 💪
