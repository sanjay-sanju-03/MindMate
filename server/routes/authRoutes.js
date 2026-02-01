import express from 'express';
import { signUp, signIn, getProfile, updateProfile } from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

export default router;
