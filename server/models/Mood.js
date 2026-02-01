import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mood: {
    type: String,
    enum: ['happy', 'neutral', 'stressed', 'anxious', 'tired', 'angry'],
    required: true,
  },
  note: String,
  date: {
    type: Date,
    default: Date.now,
  },
  time: String,
});

export default mongoose.model('Mood', moodSchema);
