import Journal from '../models/Journal.js';

export const createEntry = async (req, res) => {
  try {
    const { prompt, content } = req.body;
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
    const entries = await Journal.find({ userId: req.userId }).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEntry = async (req, res) => {
  try {
    const entry = await Journal.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json({ message: 'Entry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
