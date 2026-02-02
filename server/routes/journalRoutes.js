import express from 'express';
import { createEntry, getEntries, getEntryById, updateEntry, deleteEntry, getJournalStats } from '../controllers/journalController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createEntry);
router.get('/', auth, getEntries);
router.get('/stats', auth, getJournalStats);
router.get('/:id', auth, getEntryById);
router.put('/:id', auth, updateEntry);
router.delete('/:id', auth, deleteEntry);

export default router;
