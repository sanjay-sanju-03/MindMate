import express from 'express';
import { createEntry, getEntries, deleteEntry } from '../controllers/journalController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createEntry);
router.get('/', auth, getEntries);
router.delete('/:id', auth, deleteEntry);

export default router;
