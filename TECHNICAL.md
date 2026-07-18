# 🔧 Technical Documentation - Be More Fit Gym System

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER (Browser)                   │
│  HTML5 | CSS3 (Futuristic) | JavaScript (ES6+)             │
│  ├─ Home Page                                               │
│  ├─ Authentication (Login/Signup)                           │
│  ├─ Fitness Questionnaire                                   │
│  ├─ Membership Selection                                    │
│  ├─ User Dashboard                                          │
│  └─ Members Directory                                       │
└─────────────────────────────────────────────────────────────┘
                            ↓↑ (HTTP/HTTPS)
┌─────────────────────────────────────────────────────────────┐
│              APPLICATION SERVER (Express.js)                │
│  ├─ Authentication Routes (/api/auth)                       │
│  ├─ Member Routes (/api/members)                            │
│  ├─ JWT Middleware (Token Verification)                     │
│  ├─ CORS Middleware (Cross-Origin)                          │
│  └─ Error Handling & Logging                                │
└─────────────────────────────────────────────────────────────┘
                            ↓↑ (SQL Queries)
┌─────────────────────────────────────────────────────────────┐
│           DATA LAYER (SQLite Database)                      │
│  ├─ Users Table                                             │
│  ├─ Fitness Profiles Table                                  │
│  ├─ Memberships Table                                       │
│  └─ Attendance Table                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Directory Structure

```
gym-membership-system/
│
├── 📄 server.js                    # Main Express server entry point
├── 📄 database.js                  # SQLite database setup & schema
├── 📄 package.json                 # Dependencies & scripts
├── 📄 .env.example                 # Environment variables template
├── 📄 .gitignore                   # Git ignore rules
├── 📄 README.md                    # Main readme
├── 📄 SETUP.md                     # Installation & setup guide
├── 📄 QUICKSTART.md                # Quick start guide
├── 📄 TECHNICAL.md                 # This file
│
├── 📁 public/                      # Static files & frontend
│   ├── 📄 index.html               # Home page
│   ├── 📄 login.html               # Login page
│   ├── 📄 signup.html              # Registration page
│   ├── 📄 questionnaire.html       # Fitness assessment
│   ├── 📄 membership.html          # Plan selection
│   ├── 📄 dashboard.html           # User dashboard
│   ├── 📄 members.html             # Members list
│   │
│   ├── 📁 css/
│   │   └── 📄 styles.css           # Futuristic CSS design
│   │
│   └── 📁 js/
│       ├── 📄 auth.js              # Auth utilities
│       └── 📄 dashboard.js         # Dashboard functions
│
├── 📁 routes/                      # API route handlers
│   ├── 📄 auth.js                  # Authentication endpoints
│   └── 📄 members.js               # Member management endpoints
│
└── 📁 middleware/                  # Express middleware
    └── 📄 auth.js                  # JWT verification middleware
```

---

## 🔐 Authentication Flow

### JWT Token Generation & Validation

```
┌─────────────────────────────────────────────────────────────┐
│ 1. USER SIGNUP/LOGIN                                        │
│    ├─ User submits email & password                         │
│    ├─ Server validates credentials                          │
│    ├─ Password hashed with bcryptjs                         │
│    └─ User data stored in database                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. JWT TOKEN GENERATION                                     │
│    ├─ Payload: { userId, email, iat, exp }                 │
│    ├─ Secret: JWT_SECRET from .env                          │
│    ├─ Expiration: 30 days (2592000 seconds)                 │
│    └─ Token sent to client                                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. CLIENT STORAGE                                           │
│    ├─ Token stored in localStorage                          │
│    ├─ User data stored as JSON                              │
│    └─ Used for subsequent API requests                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. PROTECTED REQUEST                                        │
│    ├─ Header: Authorization: Bearer {token}                 │
│    ├─ Server verifies token signature                       │
│    ├─ Checks token expiration                               │
│    └─ If valid: process request, else: 401 Unauthorized     │
└─────────────────────────────────────────────────────────────┘
```

### JWT Payload Structure

```javascript
{
  userId: 1,
  email: "user@example.com",
  iat: 1623456789,           // Issued at
  exp: 1626048789            // Expires at (30 days later)
}
```

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,          -- bcrypt hashed
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  phone TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for faster queries
CREATE INDEX idx_email ON users(email);
```

### Fitness Profiles Table
```sql
CREATE TABLE fitness_profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL UNIQUE,
  height INTEGER,                  -- in cm
  weight REAL,                      -- in kg
  age INTEGER,
  gymExperience TEXT,               -- beginner/intermediate/advanced
  gymExperienceYears INTEGER DEFAULT 0,
  fitnessGoal TEXT,                 -- weight_loss/muscle_gain/endurance/overall
  goals TEXT,                       -- comma-separated
  healthConditions TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

### Memberships Table
```sql
CREATE TABLE memberships (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL UNIQUE,
  planType TEXT NOT NULL,           -- basic/premium/elite/ultimate
  planName TEXT NOT NULL,
  cost REAL NOT NULL,
  startDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  endDate DATETIME NOT NULL,
  status TEXT DEFAULT 'active',     -- active/expired
  renewalDate DATETIME,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

### Attendance Table
```sql
CREATE TABLE attendance (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  checkInTime DATETIME,
  checkOutTime DATETIME,
  date DATE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Index for faster queries
CREATE INDEX idx_userid_date ON attendance(userId, date);
```

---

## 🔌 API Endpoints Reference

### Authentication Endpoints

#### POST /api/auth/signup
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+91 98765 43210"
}
```

**Response (200):**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "userId": 1,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### POST /api/auth/login
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "userId": 1,
  "user": { ... }
}
```

#### GET /api/auth/me
**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+91 98765 43210"
}
```

---

### Member Endpoints

#### POST /api/members/fitness-profile
**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "height": 175,
  "weight": 75,
  "age": 25,
  "gymExperience": "intermediate",
  "gymExperienceYears": 2,
  "fitnessGoal": "muscle_gain",
  "goals": "strength,confidence",
  "healthConditions": "None"
}
```

#### GET /api/members/fitness-profile
**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
  "id": 1,
  "userId": 1,
  "height": 175,
  "weight": 75,
  "age": 25,
  "gymExperience": "intermediate",
  "fitnessGoal": "muscle_gain",
  "createdAt": "2024-07-18T10:30:00Z",
  "updatedAt": "2024-07-18T10:30:00Z"
}
```

#### GET /api/members/plans
**Response:**
```json
[
  {
    "type": "basic",
    "name": "Basic Plan",
    "duration": 1,
    "cost": 2999,
    "features": ["Gym Access", "Basic Equipment", "Locker"]
  },
  ...
]
```

#### POST /api/members/membership
**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "planType": "premium"
}
```

#### GET /api/members/membership
**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
  "id": 1,
  "userId": 1,
  "planType": "premium",
  "planName": "Premium Plan",
  "cost": 7999,
  "startDate": "2024-07-18T10:30:00Z",
  "endDate": "2024-10-18T10:30:00Z",
  "status": "active"
}
```

#### POST /api/members/checkin
**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
  "message": "Checked in successfully",
  "checkInTime": "2024-07-18T10:30:00Z"
}
```

#### GET /api/members/all
**Response:**
```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+91 98765 43210",
    "planName": "Premium",
    "cost": 7999,
    "endDate": "2024-10-18T10:30:00Z",
    "weight": 75,
    "height": 175
  },
  ...
]
```

---

## 🔑 Key Technologies & Dependencies

### Backend
- **express** (v4.x) - Web framework for Node.js
- **sqlite3** (v5.x) - SQL database engine
- **bcryptjs** (v2.x) - Password hashing & encryption
- **jsonwebtoken** (v8.x) - JWT token generation & verification
- **cors** (v2.x) - Cross-Origin Resource Sharing
- **dotenv** (v10.x) - Environment variable management

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling with animations
- **JavaScript (ES6+)** - Client-side scripting
- **Fetch API** - HTTP requests

---

## 🔒 Security Implementation

### Password Security
```javascript
// Signup - Hash password
const hashedPassword = await bcrypt.hash(password, 10);
// Stored in database

// Login - Compare password
const isPasswordValid = await bcrypt.compare(password, storedHash);
```

### JWT Security
```javascript
// Token generation
const token = jwt.sign(
  { userId, email },
  process.env.JWT_SECRET,
  { expiresIn: '30d' }
);

// Token verification
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

### CORS Protection
```javascript
app.use(cors({
  origin: '*',  // Adjust for production
  credentials: true
}));
```

### Input Validation
```javascript
// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password minimum 6 characters
if (password.length < 6) throw new Error('Password too short');
```

---

## 🚀 Deployment Architecture

### Development Environment
```
Local Machine
├─ Node.js Server (localhost:5000)
├─ SQLite Database (local file)
└─ Frontend Files (served by Express)
```

### Production Environment (Heroku/AWS)
```
Cloud Server
├─ Node.js Application (PM2 managed)
├─ SQLite/PostgreSQL Database
├─ Nginx Reverse Proxy (HTTPS)
├─ SSL Certificate (Let's Encrypt)
└─ Environment Variables (secure)
```

---

## 📊 Performance Metrics

### Database Indexes
- `idx_email` on users table - O(log n) email lookup
- `idx_userid_date` on attendance table - O(log n) attendance queries

### API Response Times (Target)
- Authentication: < 200ms
- Database queries: < 100ms
- File serving: < 50ms

### Scalability Considerations
- Current: Single SQLite database (suitable for small gyms)
- Future: Migrate to PostgreSQL for multi-location support
- Load balancing: Use Nginx for multiple server instances

---

## 🧪 Testing Checklist

### Manual Testing
- [ ] User signup with valid/invalid data
- [ ] User login with correct/incorrect credentials
- [ ] Token expiration after 30 days
- [ ] Protected routes redirect to login
- [ ] Fitness questionnaire validation
- [ ] Membership selection and activation
- [ ] Check-in/Check-out functionality
- [ ] Members directory search
- [ ] Dashboard data display

### Error Scenarios
- [ ] Missing .env file
- [ ] Invalid JWT token
- [ ] Expired token
- [ ] Database connection failure
- [ ] Port already in use
- [ ] Invalid email format

---

## 🔄 Development Workflow

### Making Changes
```bash
# 1. Create feature branch
git checkout -b feature/feature-name

# 2. Make changes
# 3. Test locally
npm start

# 4. Commit changes
git add .
git commit -m "feat: description"

# 5. Push to GitHub
git push origin feature/feature-name

# 6. Create Pull Request
```

### Code Standards
- Use camelCase for variables/functions
- Use PascalCase for classes
- Add comments for complex logic
- Keep functions small and focused
- Handle errors with try-catch

---

## 📝 Logging & Debugging

### Server Logs
```javascript
console.log('Server running on port:', PORT);
console.error('Database error:', error);
```

### Browser DevTools
- F12 to open Developer Tools
- Console tab for JavaScript errors
- Network tab for API requests
- Storage tab to view localStorage/tokens

### API Testing Tools
- **Postman** - GUI for API testing
- **cURL** - Command-line API testing
- **Thunder Client** - VS Code extension

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module 'express'"
**Solution:**
```bash
npm install
```

### Issue: "Database connection failed"
**Solution:**
```bash
rm gym_members.db
npm start
```

### Issue: "Token expired"
**Solution:**
- Clear localStorage: `localStorage.clear()`
- Login again
- Token expires after 30 days

### Issue: "CORS error"
**Solution:**
- Check CORS middleware is enabled
- Verify origin in CORS settings

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [JWT.io](https://jwt.io/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## 📞 Support

For technical support:
- Check SETUP.md for detailed guide
- Review error messages carefully
- Check browser console for errors
- Verify .env configuration

---

**Version:** 1.0.0  
**Last Updated:** July 18, 2024  
**Created by:** Jatin Sanap & Adarsh Patil
