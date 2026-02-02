import express from 'express';
import { createMood, getMoods, getMoodById, updateMood, deleteMood, getMoodStats } from '../controllers/moodController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createMood);
router.get('/', auth, getMoods);
router.get('/stats', auth, getMoodStats);
router.get('/:id', auth, getMoodById);
router.put('/:id', auth, updateMood);
router.delete('/:id', auth, deleteMood);

export default router;
