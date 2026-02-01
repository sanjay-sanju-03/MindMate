import Mood from '../models/Mood.js';

export const createMood = async (req, res) => {
  try {
    const { mood, note, time } = req.body;
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
    const moods = await Mood.find({ userId: req.userId }).sort({ date: -1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMood = async (req, res) => {
  try {
    const mood = await Mood.findByIdAndDelete(req.params.id);
    if (!mood) return res.status(404).json({ message: 'Mood not found' });
    res.json({ message: 'Mood deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
