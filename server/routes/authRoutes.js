import express from 'express';
import { signUp, signIn, getProfile, updateProfile, logout, changePassword } from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/signup', signUp);
router.post('/signin', signIn);

// Protected routes (require authentication)
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.post('/logout', auth, logout);
router.post('/change-password', auth, changePassword);

export default router;
