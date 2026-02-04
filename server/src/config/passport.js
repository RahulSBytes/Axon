import dotenv from 'dotenv';
dotenv.config();

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.js";


// ===== LOCAL STRATEGY =====
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {         
      try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          return done(null, false, { message: "Invalid email or password" });
        }

        if (!user.password) {
          return done(null, false, {
            message:
              "No password set for this account. Please login with Google or reset your password.",
          });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
          return done(null, false, { message: "Invalid email or password" });
        }

        user.addProvider("local");
        await user.save();

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
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
        const email = profile.emails[0].value;
        const googleId = profile.id;

        let user = await User.findOne({ googleId });

        if (user) {
          if (user.email !== email) {
            user.email = email;
            await user.save();
          }
          return done(null, user);
        }

        user = await User.findOne({ email });

        if (user) {
          user.googleId = googleId;
          user.avatar = user.avatar || profile.photos[0]?.value;
          user.addProvider("google");
          await user.save();

          return done(null, user);
        }

        user = await User.create({
          fullName: profile.displayName,
          email,
          avatar: profile.photos[0]?.value,
          providers: ["google"],
          googleId,
        });
        
        return done(null, user);
      } catch (error) {
        console.log("google error ::", error);

        return done(error);
      }
    },
  ),
);


passport.serializeUser((user, done) => {
  done(null, user._id); 
});




passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.log("deserialize error ::", error);

    done(error);
  }
});

export default passport;
