import Mood from '../models/Mood.js';

export const createMood = async (req, res) => {
  try {
    const { mood, note, time } = req.body;
    
    // Validate mood type
    const validMoods = ['happy', 'neutral', 'stressed', 'anxious', 'tired', 'angry'];
    if (!validMoods.includes(mood)) {
      return res.status(400).json({ message: 'Invalid mood type' });
    }

    const newMood = new Mood({
      userId: req.userId,
      mood,
      note,
      time,
    });
    await newMood.save();
    res.status(201).json(newMood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMoods = async (req, res) => {
  try {
    // Always filter by authenticated user ID
    const moods = await Mood.find({ userId: req.userId }).sort({ date: -1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMoodById = async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id);
    
    // Verify user owns this mood
    if (!mood) {
      return res.status(404).json({ message: 'Mood not found' });
    }
    
    if (mood.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this mood' });
    }
    
    res.json(mood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMood = async (req, res) => {
  try {
    const { mood, note, time } = req.body;
    
    // Verify user owns this mood
    const existingMood = await Mood.findById(req.params.id);
    if (!existingMood) {
      return res.status(404).json({ message: 'Mood not found' });
    }
    
    if (existingMood.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this mood' });
    }
    
    const updatedMood = await Mood.findByIdAndUpdate(
      req.params.id,
      { mood, note, time },
      { new: true }
    );
    
    res.json(updatedMood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMood = async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id);
    
    // Verify user owns this mood
    if (!mood) {
      return res.status(404).json({ message: 'Mood not found' });
    }
    
    if (mood.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this mood' });
    }
    
    await Mood.findByIdAndDelete(req.params.id);
    res.json({ message: 'Mood deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get mood statistics for user
export const getMoodStats = async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.userId });
    
    const stats = {
      total: moods.length,
      byType: {},
      lastEntry: moods[0] || null,
    };
    
    moods.forEach(m => {
      stats.byType[m.mood] = (stats.byType[m.mood] || 0) + 1;
    });
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
