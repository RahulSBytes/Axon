# Axon Server

Node.js/Express backend for Axon - Handles authentication, AI conversations, and data persistence.

## 🚀 Tech Stack

- **Node.js** - JavaScript runtime
- **Express 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Passport.js** - Authentication middleware
- **Groq SDK** - LLM inference
- **Tavily API** - Web search integration

## 📦 Key Dependencies

```json
{
  "express": "^5.2.1",
  "mongoose": "^8.18.0",
  "passport": "^0.7.0",
  "passport-google-oauth20": "^2.0.0",
  "passport-local": "^1.0.0",
  "express-session": "^1.18.2",
  "connect-mongo": "^6.0.0",
  "groq-sdk": "^0.37.0",
  "bcryptjs": "^3.0.3",
  "cors": "^2.8.6"
}
```

## 🏗️ Project Structure

```
server/
├── index.js                 # Server entry point & configuration
│
├── src/
│   ├── config/
│   │   ├── llm.js          # Groq SDK & AI configuration
│   │   └── passport.js     # Passport strategies setup
│   │
│   ├── controllers/
│   │   ├── authControllers.js           # Auth logic
│   │   ├── conversationControllers.js   # Chat operations
│   │   └── savedMessageController.js    # Bookmarked messages
│   │
│   ├── models/
│   │   ├── user.js         # User schema
│   │   ├── conversation.js # Chat schema
│   │   └── savedMessage.js # Saved message schema
│   │
│   ├── routes/
│   │   ├── authRoutes.js           # /api/auth/*
│   │   ├── conversationRoutes.js   # /api/conversations/*
│   │   └── savedMessageRoutes.js   # /api/saved/*
│   │
│   ├── utils/
│   │   ├── db.js           # MongoDB connection
│   │   ├── error.js        # Error handling
│   │   └── helpers.js      # Utility functions
│   │
│   └── middlewares.js      # Custom middlewares
│
└── package.json
```

## ⚙️ Environment Variables

Create a `.env` file in the server directory:

```env
# Environment
NODE_ENV=production

# Database
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/axon

# Session
SESSION_SECRET=your-super-secret-session-key-min-32-chars

# Client URL
CLIENT_URL=http://localhost:5173

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# AI APIs
GROQ_API_KEY=your-groq-api-key
TAVILY_API_KEY=your-tavily-api-key
```

### Production (Render)
Ensure these exact values on Render:
```env
NODE_ENV=production
CLIENT_URL=https://your-app.vercel.app
GOOGLE_CALLBACK_URL=https://your-backend.onrender.com/api/auth/google/callback
```

## 🛠️ Installation & Setup

**1. Install dependencies**
```bash
npm install
```

**2. Start development server**
```bash
npm run dev
```

Server runs on `http://localhost:5000`

**3. Start production server**
```bash
npm start
```

## 🔐 Authentication System

### Strategies Implemented

**1. Local Strategy** (Email/Password)
- Bcrypt password hashing
- Email uniqueness validation
- Session-based authentication

**2. Google OAuth 2.0**
- Passport Google Strategy
- Automatic user creation
- Profile data syncing

### Session Configuration

```javascript
// MongoDB session store for persistence
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGODB_URL,
  touchAfter: 24 * 3600,
  crypto: { secret: process.env.SESSION_SECRET }
});

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}));
```

## 🤖 AI Integration

### Groq SDK Configuration

**LLM Setup** (`src/config/llm.js`)
- Groq client initialization
- Model: `llama-3.3-70b-versatile`
- Tool calling support enabled
- Web search integration via Tavily

### Features
- **Context Memory** - Maintains conversation history
- **Tool Calling** - Executes web search when needed
- **Streaming** - Real-time response streaming
- **Error Handling** - Graceful fallbacks

## 📊 Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  googleId: String,
  avatar: String,
  createdAt: Date
}
```

### Conversation Model
```javascript
{
  userId: ObjectId,
  title: String,
  messages: [{
    role: String (user/assistant),
    content: String,
    timestamp: Date
  }],
  isPinned: Boolean,
  createdAt: Date
}
```

### Saved Message Model
```javascript
{
  userId: ObjectId,
  conversationId: ObjectId,
  message: String,
  createdAt: Date
}
```

## 🛡️ Middleware

**Custom Middlewares** (`src/middlewares.js`)
- `isAuthenticated` - Protects routes requiring login
- Error handling middleware
- Request logging

## 🌐 API Routes

### Authentication (`/api/auth`)
```
POST   /signup              - Register new user
POST   /login               - Login with email/password
GET    /google              - Initiate Google OAuth
GET    /google/callback     - Google OAuth callback
POST   /logout              - Logout user
GET    /status              - Check auth status
```

### Conversations (`/api/conversations`)
```
POST   /                    - Create new conversation
GET    /                    - Get all user conversations
GET    /:id                 - Get specific conversation
POST   /:id/messages        - Send message in conversation
PATCH  /:id/pin             - Toggle pin status
DELETE /:id                 - Delete conversation
```

### Saved Messages (`/api/saved`)
```
POST   /                    - Save a message
GET    /                    - Get all saved messages
DELETE /:id                 - Delete saved message
```

## 🚀 Deployment (Render)

**Step 1: Create Web Service**
- Connect GitHub repository
- Build Command: `npm install`
- Start Command: `npm start`

**Step 2: Set Environment Variables**
All variables from `.env` must be set in Render dashboard

**Step 3: Configure**
- Set `NODE_ENV=production`
- Update `CLIENT_URL` to Vercel domain
- Update `GOOGLE_CALLBACK_URL` to Render domain

**Step 4: Deploy**
Render auto-deploys on push to main branch

### Health Check
Render pings your service to ensure it's running. Add a health endpoint:
```javascript
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
```

## 🔧 CORS Configuration

```javascript
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## 🐛 Common Issues

**Issue: Session not persisting across requests**
- Solution: Ensure `trust proxy` is set to `1`
- Verify `secure` and `sameSite` cookie settings

**Issue: Google OAuth redirect fails**
- Solution: Check `GOOGLE_CALLBACK_URL` matches exactly
- Ensure callback URL is added in Google Console

**Issue: MongoDB connection timeout**
- Solution: Check IP whitelist in MongoDB Atlas
- Verify connection string format

**Issue: CORS errors**
- Solution: Confirm `CLIENT_URL` matches frontend exactly
- Check `credentials: true` in CORS config

## 📝 Scripts

```bash
npm start        # Production server
npm run dev      # Development with nodemon
```

## 🔒 Security Best Practices

✅ Environment variables for sensitive data  
✅ Bcrypt for password hashing  
✅ HTTP-only cookies for sessions  
✅ CSRF protection via SameSite cookies  
✅ Rate limiting (implement if needed)  
✅ Input validation and sanitization  
✅ MongoDB injection protection via Mongoose  

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com)
- [Passport.js Documentation](http://www.passportjs.org)
- [Mongoose Documentation](https://mongoosejs.com)
- [Groq Documentation](https://console.groq.com/docs)

---

**Powered by 🚀 Node.js + ⚡ Groq**