import User from "../models/user.js";
import passport from "passport";
import { customError } from "../utils/error.js";

// ===== REGISTER (Local Strategy) =====
export const register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    let existingUser = await User.findOne({ email });

    if (existingUser) {
      const userWithPassword = await User.findOne({ email }).select(
        "+password",
      );

      if (userWithPassword.password) {
        return res.status(400).json({
          success: false,
          message: "Email already registered. Please login instead.",
        });
      }

      existingUser.password = password;
      existingUser.addProvider("local");
      await existingUser.save();

      // at the end login the user and send the response
      req.login(existingUser, (err) => {
        if (err) return next(new customError("failed to register try other method", 404));

        res.status(200).json({
          success: true,
          message:
            "Password set successfully! You can now login with email/password or Google.",
          user: {
            _id: existingUser._id,
            fullName: existingUser.fullName,
            email: existingUser.email,
            avatar: existingUser.avatar,
            providers: existingUser.providers,
          },
        });
      });
      return;
    }

    const user = await User.create({
      fullName,
      email,
      password,
      providers: ["local"],
    });

    //and then Login user after registration
    req.login(user, (err) => {
      if (err) console.log("errrror :: ", err);
      if (err) return next(new customError("Failed registering try other method", 404));

      res.status(201).json({
        success: true,
        message: "Registration successful",
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
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(new customError("Login failed try other method", 404));
    if (!user) return next(new customError(info.message, 401));

    req.login(user, (err) => {
      if (err)
        return next(new customError("Login failed try other method", 404));

      res.status(200).json({
        success: true,
        message: "Login successful",
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

// ===== LOGOUT =====
export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  });
};

// ===== GET CURRENT USER =====
export const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
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
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
