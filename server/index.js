import 'dotenv/config';

import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import conversationRoutes from "./src/routes/conversationRoutes.js";
import connectDB from "./src/utils/db.js";
import cookieParser from "cookie-parser";
import passport from "./src/config/passport.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import { errorHandlerMiddleware } from "./src/utils/error.js";
import savedMessageRoutes from "./src/routes/savedMessageRoutes.js";
import cors from "cors";

const app = express();
app.set("trust proxy", 1);

await connectDB(process.env.MONGODB_URL);
export const envMode =
  process.env.NODE_ENV?.trim().toLowerCase() || "production";

app.use(
  cors({
    origin: [process.env.CLIENT_URL, 'http://localhost:5173'],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ===== SESSION CONFIGURATION =====
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGODB_URL,
  touchAfter: 24 * 3600,
  crypto: {
    secret: process.env.SESSION_SECRET,
  },
});

// Handle store errors
sessionStore.on("error", function (error) {
  console.error("Session store error:", error);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: envMode === "production",
      sameSite: envMode === "production" ? "none" : "lax",
    },
  }),
);

// ===== PASSPORT INITIALIZATION =====
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/chats", conversationRoutes);
app.use("/api/saved", savedMessageRoutes);

// just to keep backend alive 
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// --------- global error handler ---------

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
