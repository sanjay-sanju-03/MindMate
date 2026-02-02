import Journal from '../models/Journal.js';

export const createEntry = async (req, res) => {
  try {
    const { prompt, content } = req.body;
    
    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Journal content is required' });
    }

    const entry = new Journal({
      userId: req.userId,
      prompt,
      content,
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEntries = async (req, res) => {
  try {
    // Always filter by authenticated user ID
    const entries = await Journal.find({ userId: req.userId }).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEntryById = async (req, res) => {
  try {
    const entry = await Journal.findById(req.params.id);
    
    // Verify user owns this entry
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    
    if (entry.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this entry' });
    }
    
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEntry = async (req, res) => {
  try {
    const { prompt, content } = req.body;
    
    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Journal content is required' });
    }

    // Verify user owns this entry
    const existingEntry = await Journal.findById(req.params.id);
    if (!existingEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    
    if (existingEntry.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this entry' });
    }
    
    const updatedEntry = await Journal.findByIdAndUpdate(
      req.params.id,
      { prompt, content },
      { new: true }
    );
    
    res.json(updatedEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEntry = async (req, res) => {
  try {
    const entry = await Journal.findById(req.params.id);
    
    // Verify user owns this entry
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    
    if (entry.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this entry' });
    }
    
    await Journal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get journal statistics for user
export const getJournalStats = async (req, res) => {
  try {
    const entries = await Journal.find({ userId: req.userId });
    
    const stats = {
      total: entries.length,
      lastEntry: entries[0] || null,
      totalWords: entries.reduce((sum, e) => sum + (e.content?.split(/\s+/).length || 0), 0),
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
