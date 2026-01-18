// routes/authRoutes.js
import express from 'express';
import passport from 'passport';
import {
  register,
  login,
  logout,
  getMe
} from '../controllers/authControllers.js';
import { isAuthenticated } from '../middlewares.js';

const router = express.Router();

router.post('/register', register);  //done testing
router.post('/login', login);  //done testing
router.post('/logout', logout);  //done testing
router.get('/me', isAuthenticated, getMe);   //done testing


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
    res.redirect(`${process.env.CLIENT_URL}/`);
  }
);




export default router;