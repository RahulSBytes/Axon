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

router.post('/register', register);
router.post('/login', login); 
router.post('/logout', logout); 
router.get('/me', isAuthenticated, getMe);


router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    successRedirect: `${process.env.CLIENT_URL}/`,
  })
);


export default router;