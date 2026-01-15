// config/passport.js
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

// ================================
// LOCAL STRATEGY (Email/Password)
// ================================
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // Find user
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
          return done(null, false, { message: "Email not registered" });
        }

        // Check if user has a password (might be Google-only user)
        if (!user.password) {
          return done(null, false, { 
            message: "Please use Google login or set a password" 
          });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);

      } catch (error) {
        return done(error);
      }
    }
  )
);

// ================================
// GOOGLE STRATEGY
// ================================
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const avatar = profile.photos[0]?.value || null;
        const googleId = profile.id;

        // Find user by email
        let user = await User.findOne({ email });

        if (user) {
          // Existing user - link Google account
          user.googleId = googleId;
          user.avatar = avatar;
          
          if (user.authProvider === "local") {
            user.authProvider = "both";  // Now has both methods
          }
          
          await user.save();
        } else {
          // New user - create account
          user = await User.create({
            name,
            email,
            googleId,
            avatar,
            authProvider: "google",
          });
        }

        return done(null, user);

      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;












//############### routes ########################


// routes/auth.js
import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// Helper: Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Helper: Format user for response
const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar || `https://ui-avatars.com/api/?name=${user.name}`,
  authProvider: user.authProvider,
});

// ================================
// EMAIL/PASSWORD ROUTES
// ================================

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        error: "Password must be at least 6 characters" 
      });
    }

    // Check if email exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      authProvider: "local",
    });

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      message: "Registration successful",
      token,
      user: formatUser(user),
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    
    if (err) {
      return res.status(500).json({ error: "Server error" });
    }

    if (!user) {
      return res.status(401).json({ error: info.message });
    }

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: formatUser(user),
    });

  })(req, res, next);
});

// ================================
// GOOGLE OAUTH ROUTES
// ================================

// Start OAuth flow
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login?error=google_failed`,
  }),
  (req, res) => {
    // Generate JWT for the authenticated user
    const token = generateToken(req.user);

    // Redirect to frontend with token
    res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
  }
);

// ================================
// COMMON ROUTES
// ================================

// Get current user
router.get("/me", async (req, res) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user: formatUser(user) });

  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;