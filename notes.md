const userSchema = {
  name: String,
  email: String,
  password: String,
  avatar: String,
  preferences: {
    theme: { type: String, default: "dark" },
    defaultVoice: { type: String, default: "nova" },
    defaultModel: { type: String, default: "llama3-8b-8192" },
  },
  createdAt: Date,
};




const conversationSchema = {
  user_id: ObjectId,
  title: { type: String, default: "New Chat" },
  lastMessageAt: Date,
  isPinned: { type: Boolean, default: false },
  createdAt: Date,
};




const messageSchema = {
  conversation_id: ObjectId,
  role: { type: String, enum: ["user", "assistant", "system"] },
  content: String,
  model: String,       // For assistant messages
  createdAt: Date,
};



const favoriteSchema = {
  user_id: ObjectId,
  message_id: ObjectId,
  conversation_id: ObjectId,
  note: String,
  createdAt: Date,
};




















---------auth




Here's a complete, simple implementation of Passport.js with Google OAuth2.0 and Local Strategy (email-based):

## 🔐 **Complete Passport.js Authentication**

### **Step 1: Install Dependencies**

```bash
npm install passport passport-local passport-google-oauth20 express-session bcryptjs dotenv
```

---

### **Step 2: Environment Variables**

```env
# .env
PORT=5000
MONGODB_URL=mongodb://localhost:27017/your-database
SESSION_SECRET=your-super-secret-session-key-change-this-in-production

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id-from-console.cloud.google.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/v1/auth/google/callback

# Frontend URL
CLIENT_URL=http://localhost:5173
```

---

### **Step 3: User Model**

```javascript
// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false, // Don't return password by default
    },
    avatar: {
      type: String,
      default: null,
    },
    provider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
    },
    googleId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Hash password before saving (only for local strategy)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
```

---

### **Step 4: Passport Configuration**

```javascript
// config/passport.js
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

// ===== LOCAL STRATEGY =====
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Use email instead of username
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        // Find user by email and include password field
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        // Check if user registered with Google
        if (user.provider === 'google') {
          return done(null, false, {
            message: 'Please login with Google',
          });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// ===== GOOGLE STRATEGY =====
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // User exists, check if they're registered via Google
          if (user.provider !== 'google') {
            return done(null, false, {
              message: 'Email already registered. Please login with email/password',
            });
          }
          return done(null, user);
        }

        // Create new user
        user = await User.create({
          fullName: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0]?.value || null,
          provider: 'google',
          googleId: profile.id,
        });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// ===== SERIALIZE & DESERIALIZE USER =====
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
```

---

### **Step 5: Auth Controller**

```javascript
// controllers/authController.js
import User from '../models/User.js';
import passport from 'passport';

// ===== REGISTER (Local Strategy) =====
export const register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // Create user
    const user = await User.create({
      fullName,
      email,
      password,
      provider: 'local',
    });

    // Login user after registration
    req.login(user, (err) => {
      if (err) return next(err);

      res.status(201).json({
        success: true,
        message: 'Registration successful',
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          avatar: user.avatar,
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===== LOGIN (Local Strategy) =====
export const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: info.message || 'Authentication failed',
      });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Login successful',
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          avatar: user.avatar,
        },
      });
    });
  })(req, res, next);
};

// ===== GOOGLE AUTH (Handled by Passport) =====
// No controller needed, handled in routes

// ===== LOGOUT =====
export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  });
};

// ===== GET CURRENT USER =====
export const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
    }

    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
        provider: user.provider,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
```

---

### **Step 6: Auth Middleware**

```javascript
// middleware/auth.js
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).json({
    success: false,
    message: 'Please login to access this resource',
  });
};
```

---

### **Step 7: Auth Routes**

```javascript
// routes/authRoutes.js
import express from 'express';
import passport from 'passport';
import {
  register,
  login,
  logout,
  getMe,
} from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// ===== LOCAL STRATEGY ROUTES =====
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', isAuthenticated, getMe);

// ===== GOOGLE OAUTH ROUTES =====
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login?error=google_auth_failed`,
  }),
  (req, res) => {
    // Successful authentication
    res.redirect(`${process.env.CLIENT_URL}/chat`);
  }
);

export default router;
```

---

### **Step 8: Main Server Setup**

```javascript
// index.js
import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from './config/passport.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// ===== CONNECT TO DATABASE =====
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ===== MIDDLEWARE =====
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== SESSION CONFIGURATION =====
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
  })
);

// ===== PASSPORT INITIALIZATION =====
app.use(passport.initialize());
app.use(passport.session());

// ===== ROUTES =====
app.use('/api/v1/auth', authRoutes);

// ===== TEST ROUTE =====
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
```

---

### **Step 9: Frontend - Login Component**

```javascript
// components/Login.jsx
import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Local Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${API_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      console.log('Login success:', data);
      alert('Login successful!');
      window.location.href = '/chat';
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Local Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Continue with Google</span>
        </button>

        {/* Register Link */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
```

---

### **Step 10: Frontend - Register Component**

```javascript
// components/Register.jsx
import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${API_URL}/auth/register`,
        {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      console.log('Registration success:', data);
      alert('Registration successful!');
      window.location.href = '/chat';
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter password (min 6 characters)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Continue with Google</span>
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
```

---

## 🔑 **Getting Google OAuth Credentials:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URIs:
   - `http://localhost:5000/api/v1/auth/google/callback`
   - `https://yourdomain.com/api/v1/auth/google/callback` (production)
6. Copy Client ID and Client Secret to `.env`

---

## ✅ **Features Included:**

- ✅ Local Strategy (email/password)
- ✅ Google OAuth2.0
- ✅ Password hashing with bcrypt
- ✅ Session management
- ✅ Protected routes
- ✅ Simple and clean code
- ✅ Error handling
- ✅ User serialization/deserialization

This is a complete, production-ready authentication system! 🚀






---------------------------








I'll break down this Passport.js authentication system by explaining each major code block and how they work together.

---

## **🏗️ Architecture Overview**

This system creates a **session-based authentication** flow with two login methods:
1. **Local Strategy** (email/password)
2. **Google OAuth2.0**

---

## **📦 Dependencies Block**

```bash
npm install passport passport-local passport-google-oauth20 express-session bcryptjs dotenv
```

**Purpose:** Installs the authentication toolkit.

- `passport`: Core authentication middleware
- `passport-local`: Strategy for email/password login
- `passport-google-oauth20`: Strategy for Google OAuth
- `express-session`: Creates persistent login sessions
- `bcryptjs`: Hashes passwords securely
- `dotenv`: Manages environment variables

---

## **🔧 Environment Variables Block**

**Purpose:** Centralizes sensitive configuration data.

**How it works:**
- Stores API keys, database URLs, and secrets outside your code
- `SESSION_SECRET`: Encrypts session cookies
- Google credentials: Identifies your app to Google's OAuth service
- `CLIENT_URL`: Where to redirect users after authentication

---

## **📊 User Model Block**

```javascript
const userSchema = new mongoose.Schema({ ... })
```

**Purpose:** Defines the database structure for users.

**Key parts:**
1. **Schema definition**: Specifies what data each user has (name, email, password, etc.)
2. **Password hashing middleware** (`userSchema.pre('save')`):
   - Automatically runs before saving a user
   - Converts plain text passwords to encrypted hashes
   - Only runs if password was modified
3. **Password comparison method** (`comparePassword`):
   - Safely checks if entered password matches stored hash
   - Returns true/false without exposing the actual password

**Why the `select: false` on password?**
When you query users, passwords won't be returned by default (security measure). You must explicitly request it with `.select('+password')`.

---

## **🛂 Passport Configuration Block**

This is the **heart of authentication**. It has three main sections:

### **1. Local Strategy Block**

```javascript
passport.use(new LocalStrategy({ ... }))
```

**Purpose:** Handles email/password login.

**How it works:**
1. Receives email and password from login form
2. Finds user in database by email
3. Checks if user exists and uses the correct login method
4. Compares entered password with stored hash
5. Returns user object if valid, or error message if not

**Flow:**
```
User submits login form → LocalStrategy receives credentials → 
Queries database → Validates password → Returns success/failure
```

---

### **2. Google Strategy Block**

```javascript
passport.use(new GoogleStrategy({ ... }))
```

**Purpose:** Handles Google OAuth login.

**How it works:**
1. **User clicks "Login with Google"** → Redirects to Google's login page
2. **User authorizes your app** → Google sends back user profile data
3. **Strategy callback executes:**
   - Checks if email already exists in your database
   - If exists: Verifies they registered with Google (not email/password)
   - If new: Creates account with Google profile data
4. Returns user object

**Key difference from Local Strategy:**
- No password handling (Google manages that)
- Automatically creates accounts on first login
- Uses `googleId` to track which Google account it is

---

### **3. Serialize/Deserialize Block**

```javascript
passport.serializeUser((user, done) => { ... })
passport.deserializeUser(async (id, done) => { ... })
```

**Purpose:** Manages session persistence.

**How it works:**

**Serialization** (Login):
```
User logs in → Passport saves user._id to session cookie → 
Cookie sent to browser
```

**Deserialization** (Every request):
```
Browser sends cookie → Passport reads user._id → 
Queries database for full user object → 
Attaches user to req.user
```

**Why this matters:**
Instead of querying the database on every request, the session stores just the user ID. Only when needed (like accessing `req.user`), it fetches the full user data.

---

## **🎮 Auth Controller Block**

### **Register Function**

**Purpose:** Creates new accounts (local strategy).

**Flow:**
1. Receives form data (name, email, password)
2. Checks if email already exists
3. Creates user in database (password auto-hashed by model middleware)
4. Logs user in immediately using `req.login()`
5. Returns user data

---

### **Login Function**

**Purpose:** Authenticates existing users (local strategy).

**Flow:**
1. Calls `passport.authenticate('local')` to trigger LocalStrategy
2. Strategy validates credentials
3. If valid: Calls `req.login()` to create session
4. Returns user data or error message

**Why the custom callback?**
```javascript
passport.authenticate('local', (err, user, info) => { ... })
```
This gives you control over the response format instead of Passport's default behavior.

---

### **Logout Function**

**Purpose:** Destroys user session.

**How it works:**
- Calls `req.logout()` which removes session data
- Browser's session cookie becomes invalid
- User must log in again

---

### **getMe Function**

**Purpose:** Returns current logged-in user's data.

**How it works:**
1. Checks if `req.user` exists (populated by deserializeUser)
2. If yes: Returns user info
3. If no: Returns "not authenticated" error

**Usage:** Frontend calls this on page load to check login status.

---

## **🚧 Auth Middleware Block**

```javascript
export const isAuthenticated = (req, res, next) => { ... }
```

**Purpose:** Protects routes that require login.

**How it works:**
- `req.isAuthenticated()` checks if session exists and is valid
- If true: Continues to route handler (`next()`)
- If false: Returns 401 error

**Example:**
```javascript
router.get('/profile', isAuthenticated, getProfile)
```
User can only access `/profile` if logged in.

---

## **🛤️ Auth Routes Block**

**Purpose:** Maps URLs to controller functions.

**Local routes:**
- `POST /register`: Creates account
- `POST /login`: Logs in user
- `POST /logout`: Logs out user
- `GET /me`: Gets current user (protected)

**Google routes:**
- `GET /google`: Starts OAuth flow, redirects to Google
- `GET /google/callback`: Google returns here after login
  - Success: Redirects to `/chat`
  - Failure: Redirects to `/login?error=...`

---

## **⚙️ Main Server Setup Block**

### **Session Configuration**

```javascript
app.use(session({ ... }))
```

**Purpose:** Enables session-based authentication.

**Key settings:**
- `secret`: Encrypts session cookies
- `resave: false`: Don't save session if nothing changed
- `saveUninitialized: false`: Don't create session until user logs in
- `cookie.maxAge`: Session expires in 7 days
- `httpOnly: true`: JavaScript can't access cookie (prevents XSS attacks)
- `secure: true` (production): Only send cookie over HTTPS
- `sameSite`: Prevents CSRF attacks

---

### **Passport Initialization**

```javascript
app.use(passport.initialize())
app.use(passport.session())
```

**Purpose:** Connects Passport to Express sessions.

1. `passport.initialize()`: Sets up Passport middleware
2. `passport.session()`: Tells Passport to use sessions for persistence

**Order matters!** Must come after `session()` middleware.

---

## **🌐 Frontend Components**

### **Login Component**

**Two login methods:**

**1. Email/Password:**
```javascript
const handleLogin = async (e) => {
  await axios.post('/auth/login', { email, password }, { withCredentials: true })
}
```
- Sends credentials to backend
- `withCredentials: true`: Includes session cookie in request

**2. Google OAuth:**
```javascript
const handleGoogleLogin = () => {
  window.location.href = '/auth/google'
}
```
- Redirects entire page to Google
- User returns to callback URL after authorizing

---

### **Register Component**

**Purpose:** Creates new accounts.

**Flow:**
1. User fills form
2. Validates passwords match
3. Sends data to `/auth/register`
4. Backend creates account and logs user in
5. Redirects to `/chat`

---

## **🔄 How Everything Works Together**

### **Registration Flow:**
```
Frontend form → POST /register → authController.register() →
User model creates user → Password auto-hashed → 
req.login() creates session → Session cookie sent to browser →
Frontend redirects to /chat
```

---

### **Local Login Flow:**
```
Frontend form → POST /login → passport.authenticate('local') →
LocalStrategy validates credentials → req.login() creates session →
Session cookie sent to browser → Returns user data
```

---

### **Google Login Flow:**
```
Click "Google Login" → GET /auth/google → 
Redirect to Google → User authorizes → 
Google redirects to /auth/google/callback →
GoogleStrategy finds/creates user → req.login() creates session →
Redirects to /chat
```

---

### **Protected Route Access:**
```
User visits /profile → Browser sends session cookie →
deserializeUser() loads user from cookie ID →
isAuthenticated middleware checks req.user exists →
If yes: allows access, if no: returns 401
```

---

### **Every Subsequent Request:**
```
Browser sends request + session cookie →
express-session verifies cookie →
passport.deserializeUser() loads user from DB →
Attaches user to req.user →
Controller accesses req.user for user data
```

---

## **🔐 Security Features**

1. **Password hashing**: Plain passwords never stored
2. **Session encryption**: `SESSION_SECRET` encrypts cookies
3. **HttpOnly cookies**: JavaScript can't steal session
4. **HTTPS in production**: `secure: true` prevents cookie theft
5. **SameSite protection**: Prevents CSRF attacks
6. **Provider separation**: Can't login with wrong method (Google vs local)

---

This system creates a secure, persistent login experience where users stay logged in across page refreshes and browser sessions until they logout or the session expires (7 days).




--------------------------






where does the following methods commitng from? when they are attached to the req?
`req.isAuthenticated()`
req.logout()
req.login()

after which block of code following blocks are called ?
passport.serializeUser((user, done) => { ... })
 passport.deserializeUser(async (id, done) => { ... })






 Great questions! Let me explain where these methods come from and when they're called.

---

## **🔍 Where `req.login()`, `req.logout()`, `req.isAuthenticated()` Come From**

These methods are **attached to the `req` object by Passport** when you initialize it.

### **When They're Attached:**

```javascript
// In your main server file (index.js)

app.use(passport.initialize());  // ← THIS LINE attaches the methods
app.use(passport.session());
```

**What `passport.initialize()` does:**

1. Adds `req._passport` property (internal state)
2. **Attaches these methods to every request:**
   - `req.login()` (alias: `req.logIn()`)
   - `req.logout()` (alias: `req.logOut()`)
   - `req.isAuthenticated()`
   - `req.isUnauthenticated()`

### **Behind the Scenes:**

When you call `app.use(passport.initialize())`, Passport runs middleware that does something like this:

```javascript
// Simplified version of what Passport does internally
function initialize() {
  return function(req, res, next) {
    req.login = function(user, done) {
      // Passport's login logic
    };
    
    req.logout = function(done) {
      // Passport's logout logic
    };
    
    req.isAuthenticated = function() {
      // Returns true if req.user exists
      return (req.user) ? true : false;
    };
    
    next();
  };
}
```

So these methods are **middleware-injected functions** available on every request after Passport initialization.

---

## **📝 What Each Method Does Internally**

### **1. `req.login(user, callback)`**

**Purpose:** Establishes a login session.

**Internal flow:**
```javascript
req.login(user, (err) => {
  // 1. Calls passport.serializeUser(user, done)
  // 2. Takes the user ID returned by serializeUser
  // 3. Stores it in req.session.passport.user
  // 4. Session middleware saves this to the session store/cookie
});
```

**Real example:**
```javascript
// After user registers
req.login(user, (err) => {
  if (err) return next(err);
  res.json({ success: true, user });
});
```

---

### **2. `req.logout(callback)`**

**Purpose:** Destroys the login session.

**Internal flow:**
```javascript
req.logout((err) => {
  // 1. Removes req.user
  // 2. Deletes req.session.passport.user
  // 3. Session middleware updates cookie
});
```

---

### **3. `req.isAuthenticated()`**

**Purpose:** Checks if user is logged in.

**Internal logic:**
```javascript
req.isAuthenticated = function() {
  return !!req.user; // Returns true if req.user exists
};
```

**Usage:**
```javascript
if (req.isAuthenticated()) {
  // User is logged in
} else {
  // User is NOT logged in
}
```

---

## **🔄 When `serializeUser` and `deserializeUser` Are Called**

These are **NOT called directly in your code**. They're called **automatically by Passport** at specific points in the request lifecycle.

---

### **When `serializeUser()` Is Called:**

**Triggered by:** `req.login()` or successful authentication

**Timing:**
```
User logs in successfully → 
passport.authenticate() or req.login() is called →
passport.serializeUser() executes →
Stores user ID in session
```

**Code block that triggers it:**

#### **Example 1: After registration**
```javascript
// authController.js - register function
req.login(user, (err) => {  // ← THIS triggers serializeUser
  if (err) return next(err);
  res.status(201).json({ success: true, user });
});
```

#### **Example 2: After local login**
```javascript
// authController.js - login function
req.login(user, (err) => {  // ← THIS triggers serializeUser
  if (err) return res.status(500).json({ success: false });
  res.status(200).json({ success: true, user });
});
```

#### **Example 3: After Google OAuth**
```javascript
// authRoutes.js - Google callback
router.get(
  '/google/callback',
  passport.authenticate('google', { ... }),  // ← THIS triggers serializeUser
  (req, res) => {
    res.redirect('/chat');
  }
);
```

**What happens inside `serializeUser`:**
```javascript
passport.serializeUser((user, done) => {
  done(null, user._id);  // Saves ONLY the ID to session
});

// Results in session data:
req.session = {
  passport: {
    user: "507f1f77bcf86cd799439011"  // ← User ID stored here
  }
}
```

---

### **When `deserializeUser()` Is Called:**

**Triggered by:** Every request that has a valid session cookie

**Timing:**
```
Browser sends request with session cookie →
express-session verifies cookie →
passport.session() middleware runs →
passport.deserializeUser() executes →
Attaches full user object to req.user
```

**Code block that triggers it:**

#### **In your server setup:**
```javascript
// index.js
app.use(session({ ... }));          // 1. Loads session from cookie
app.use(passport.initialize());     // 2. Sets up Passport
app.use(passport.session());        // 3. ← THIS triggers deserializeUser on every request
```

**What happens inside `deserializeUser`:**
```javascript
passport.deserializeUser(async (id, done) => {
  // 1. Receives user ID from session: "507f1f77bcf86cd799439011"
  // 2. Queries database for full user object
  const user = await User.findById(id);
  // 3. Attaches user to req.user
  done(null, user);
});

// After this runs:
req.user = {
  _id: "507f1f77bcf86cd799439011",
  fullName: "John Doe",
  email: "john@example.com",
  // ... full user object
}
```

---

## **📊 Complete Request Lifecycle**

### **First Login (Registration/Login):**

```
1. User submits login form
   ↓
2. POST /auth/login → authController.login()
   ↓
3. passport.authenticate('local') validates credentials
   ↓
4. req.login(user, callback) is called
   ↓
5. passport.serializeUser(user, done) executes
   ↓
6. User ID stored in session: req.session.passport.user = user._id
   ↓
7. express-session saves session to cookie
   ↓
8. Cookie sent to browser
   ↓
9. Response: { success: true, user: {...} }
```

---

### **Subsequent Requests (Already Logged In):**

```
1. Browser sends request with session cookie
   ↓
2. express-session middleware runs
   - Reads cookie
   - Loads session data: { passport: { user: "507f..." } }
   ↓
3. passport.initialize() runs
   - Attaches req.login(), req.logout(), req.isAuthenticated()
   ↓
4. passport.session() runs
   - Finds user ID in session
   - Calls passport.deserializeUser(id, done)
   ↓
5. deserializeUser queries database
   - User.findById(id)
   - Returns full user object
   ↓
6. User attached to req.user
   ↓
7. Route handler executes
   - Can access req.user
   - Can call req.isAuthenticated() (returns true)
   ↓
8. Response sent
```

---

### **Protected Route Example:**

```javascript
// routes/authRoutes.js
router.get('/me', isAuthenticated, getMe);

// Step-by-step:
// 1. Request arrives: GET /api/v1/auth/me
// 2. Session cookie sent by browser
// 3. express-session loads session
// 4. passport.session() calls deserializeUser()
// 5. req.user is populated
// 6. isAuthenticated middleware runs:
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {  // ← Checks if req.user exists
    return next();  // ← Proceeds to getMe controller
  }
  res.status(401).json({ message: 'Not authenticated' });
};
// 7. getMe controller executes:
export const getMe = async (req, res) => {
  const user = req.user;  // ← User already loaded by deserializeUser
  res.json({ success: true, user });
};
```

---

## **🎯 Summary**

| Method | Attached By | Called By | When |
|--------|-------------|-----------|------|
| `req.login()` | `passport.initialize()` | Your code | Manually after successful auth |
| `req.logout()` | `passport.initialize()` | Your code | Manually when user logs out |
| `req.isAuthenticated()` | `passport.initialize()` | Your code | Anytime to check login status |
| `serializeUser()` | Your config | `req.login()` or `passport.authenticate()` | After successful login |
| `deserializeUser()` | Your config | `passport.session()` | Every request with valid session |

---

### **Order of Middleware Execution:**

```javascript
// index.js - ORDER MATTERS!

app.use(session({ ... }));           // 1. Must come first
app.use(passport.initialize());      // 2. Attaches req.login(), etc.
app.use(passport.session());         // 3. Calls deserializeUser on each request

app.use('/api/v1/auth', authRoutes); // 4. Your routes (can now use req.user)
```

Without this order, `req.user` won't be available, and `req.isAuthenticated()` will always return `false`.






--------





list all the methods that passport js provides like .login(), .logout()





# **📚 Complete List of Passport.js Methods**

## **🔐 Methods Attached to `req` Object**

These are added by `passport.initialize()`:

### **1. Authentication Methods**

```javascript
req.login(user, options, callback)
req.logIn(user, options, callback)  // Alias for req.login()
```
**Purpose:** Establish a login session  
**Usage:**
```javascript
req.login(user, (err) => {
  if (err) return next(err);
  res.json({ success: true });
});

// With options
req.login(user, { session: false }, callback); // Don't create session
```

---

```javascript
req.logout(options, callback)
req.logOut(options, callback)  // Alias for req.logout()
```
**Purpose:** Terminate login session  
**Usage:**
```javascript
// Old way (deprecated but still works)
req.logout();

// New way (Passport v0.6.0+)
req.logout((err) => {
  if (err) return next(err);
  res.json({ success: true });
});

// With options
req.logout({ keepSessionInfo: true }, callback);
```

---

```javascript
req.isAuthenticated()
```
**Purpose:** Check if user is logged in  
**Returns:** `true` or `false`  
**Usage:**
```javascript
if (req.isAuthenticated()) {
  console.log('User is logged in');
}
```

---

```javascript
req.isUnauthenticated()
```
**Purpose:** Check if user is NOT logged in  
**Returns:** `true` or `false`  
**Usage:**
```javascript
if (req.isUnauthenticated()) {
  return res.redirect('/login');
}
```

---

## **👤 User Access Methods**

```javascript
req.user
```
**Purpose:** Access the authenticated user object  
**Type:** Object or `undefined`  
**Usage:**
```javascript
if (req.user) {
  console.log(req.user.email);
  console.log(req.user._id);
}
```

---

```javascript
req.session.passport.user
```
**Purpose:** Access the serialized user ID stored in session  
**Type:** String/Number (whatever you passed to `done()` in `serializeUser`)  
**Usage:**
```javascript
console.log(req.session.passport.user); // "507f1f77bcf86cd799439011"
```

---

## **🔧 Passport Configuration Methods**

These are called in your `config/passport.js` file:

```javascript
passport.use(name, strategy)
passport.use(strategy)  // Name defaults to strategy name
```
**Purpose:** Register an authentication strategy  
**Usage:**
```javascript
// Named strategy
passport.use('local-login', new LocalStrategy(...));
passport.use('local-register', new LocalStrategy(...));

// Default name (uses strategy's name)
passport.use(new LocalStrategy(...));  // Name: "local"
passport.use(new GoogleStrategy(...)); // Name: "google"
```

---

```javascript
passport.unuse(name)
```
**Purpose:** Remove a strategy  
**Usage:**
```javascript
passport.unuse('local');
```

---

```javascript
passport.serializeUser(fn)
```
**Purpose:** Define what data to store in session  
**Usage:**
```javascript
passport.serializeUser((user, done) => {
  done(null, user._id);  // Store only ID
});

// Multiple serializers (first one wins)
passport.serializeUser((user, done) => {
  if (user.provider === 'google') {
    done(null, { id: user._id, provider: 'google' });
  } else {
    done(null, user._id);
  }
});
```

---

```javascript
passport.deserializeUser(fn)
```
**Purpose:** Define how to retrieve user from session data  
**Usage:**
```javascript
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
```

---

```javascript
passport.transformAuthInfo(fn)
```
**Purpose:** Transform the `info` object passed from strategy  
**Usage:**
```javascript
passport.transformAuthInfo((info, done) => {
  done(null, { 
    ...info, 
    timestamp: Date.now() 
  });
});
```

---

## **🔄 Middleware Methods**

```javascript
passport.initialize(options)
```
**Purpose:** Initialize Passport middleware  
**Usage:**
```javascript
app.use(passport.initialize());
```

---

```javascript
passport.session(options)
```
**Purpose:** Enable persistent login sessions  
**Usage:**
```javascript
app.use(passport.session());

// With options
app.use(passport.session({ 
  pauseStream: false 
}));
```

**Alias:**
```javascript
passport.authenticate('session')  // Same as passport.session()
```

---

```javascript
passport.authenticate(strategy, options, callback)
```
**Purpose:** Authenticate requests using specified strategy  
**Usage:**

**Basic:**
```javascript
app.post('/login', 
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
  })
);
```

**With callback (custom handling):**
```javascript
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });
    
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({ success: true, user });
    });
  })(req, res, next);
});
```

**Multiple strategies:**
```javascript
passport.authenticate(['local', 'jwt'], { session: false })
```

**Common options:**
```javascript
passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true,        // Enable flash messages
  successFlash: 'Welcome!',  // Flash message on success
  successMessage: true,      // Store success message in session
  failureMessage: true,      // Store failure message in session
  session: true,             // Create session (default: true)
  scope: ['email', 'profile'], // OAuth scopes
  state: 'randomstring',     // OAuth state parameter
  callbackURL: '/callback'   // Override callback URL
})
```

---

```javascript
passport.authorize(strategy, options, callback)
```
**Purpose:** Authorize without logging in (connect accounts)  
**Usage:**
```javascript
// Connect Google account to existing user
app.get('/connect/google',
  passport.authorize('google', {
    scope: ['profile', 'email']
  })
);

// Access authorized account
req.account  // Instead of req.user
```

---

## **📊 Session Framework Integration**

```javascript
passport.sessionStrategy
```
**Purpose:** Access the session strategy instance  
**Usage:**
```javascript
const strategy = passport._strategy('session');
```

---

## **🔍 Strategy Methods**

These are available when creating custom strategies:

```javascript
this.success(user, info)
```
**Purpose:** Indicate successful authentication  
**Usage in custom strategy:**
```javascript
Strategy.prototype.authenticate = function(req) {
  const user = { id: 1, username: 'john' };
  this.success(user);
};
```

---

```javascript
this.fail(challenge, status)
this.fail(status)
```
**Purpose:** Indicate authentication failure  
**Usage:**
```javascript
this.fail('Invalid credentials', 401);
this.fail(401);
this.fail({ message: 'Invalid token' });
```

---

```javascript
this.redirect(url, status)
```
**Purpose:** Redirect to another URL  
**Usage:**
```javascript
this.redirect('/login', 302);
```

---

```javascript
this.pass()
```
**Purpose:** Skip authentication (pass to next middleware)  
**Usage:**
```javascript
this.pass();
```

---

```javascript
this.error(err)
```
**Purpose:** Indicate an error occurred  
**Usage:**
```javascript
this.error(new Error('Database connection failed'));
```

---

## **🎛️ Advanced/Internal Methods**

```javascript
passport.framework(fw)
```
**Purpose:** Set the framework adapter (Connect/Express)  
**Usage:** (Rarely used, auto-detected)
```javascript
passport.framework(require('passport/lib/framework/connect')());
```

---

```javascript
passport._strategy(name)
```
**Purpose:** Get a strategy instance by name  
**Usage:**
```javascript
const localStrategy = passport._strategy('local');
```

---

```javascript
passport._strategies
```
**Purpose:** Access all registered strategies  
**Usage:**
```javascript
console.log(passport._strategies);
// { local: LocalStrategy, google: GoogleStrategy }
```

---

```javascript
passport._serializers
```
**Purpose:** Access all serializer functions  
**Usage:**
```javascript
console.log(passport._serializers);
```

---

```javascript
passport._deserializers
```
**Purpose:** Access all deserializer functions  
**Usage:**
```javascript
console.log(passport._deserializers);
```

---

## **🔔 Event Emitters** (Rarely Used)

Passport extends EventEmitter:

```javascript
passport.on('authenticate', (strategy, options) => {
  console.log(`Authenticating with ${strategy}`);
});
```

---

## **📋 Complete Usage Example**

```javascript
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

// ===== CONFIGURATION =====
passport.use(new LocalStrategy(async (username, password, done) => {
  // Strategy logic
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// ===== MIDDLEWARE =====
app.use(passport.initialize());
app.use(passport.session());

// ===== ROUTES =====
// Using passport.authenticate()
app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}));

// Using req.login()
app.post('/register', async (req, res, next) => {
  const user = await User.create(req.body);
  req.login(user, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

// Using req.logout()
app.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

// Using req.isAuthenticated()
app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// Using req.isUnauthenticated()
app.get('/login-page', (req, res) => {
  if (req.isUnauthenticated()) {
    res.render('login');
  } else {
    res.redirect('/dashboard');
  }
});

// Using passport.authorize() (connect accounts)
app.get('/connect/google', 
  passport.authorize('google', { scope: ['profile'] })
);
```

---

## **📊 Method Categories Summary**

| Category | Methods |
|----------|---------|
| **Request Auth** | `req.login()`, `req.logout()`, `req.isAuthenticated()`, `req.isUnauthenticated()` |
| **User Access** | `req.user`, `req.account`, `req.session.passport.user` |
| **Configuration** | `passport.use()`, `passport.unuse()`, `passport.serializeUser()`, `passport.deserializeUser()` |
| **Middleware** | `passport.initialize()`, `passport.session()`, `passport.authenticate()`, `passport.authorize()` |
| **Strategy Methods** | `this.success()`, `this.fail()`, `this.redirect()`, `this.pass()`, `this.error()` |
| **Internal** | `passport._strategy()`, `passport._strategies`, `passport._serializers` |

The most commonly used methods in day-to-day development are:
- `passport.use()`
- `passport.serializeUser()` / `passport.deserializeUser()`
- `passport.initialize()` / `passport.session()`
- `passport.authenticate()`
- `req.login()` / `req.logout()`
- `req.isAuthenticated()`
- `req.user`