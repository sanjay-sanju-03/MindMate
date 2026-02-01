import express from 'express';
import { createMood, getMoods, deleteMood } from '../controllers/moodController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createMood);
router.get('/', auth, getMoods);
router.delete('/:id', auth, deleteMood);

export default router;
