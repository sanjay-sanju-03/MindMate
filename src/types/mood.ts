export type MoodType = 'happy' | 'neutral' | 'stressed' | 'anxious' | 'tired' | 'angry';

export interface MoodEntry {
  id: string;
  date: string;
  time: string;
  mood: MoodType;
  note?: string;
}

export interface UserPreferences {
  name?: string;
  studyLevel?: 'high-school' | 'undergraduate' | 'graduate' | 'other';
  stressSource?: 'academics' | 'personal' | 'both';
  hasCompletedOnboarding: boolean;
}

export interface JournalEntry {
  id: string;
  date: string;
  prompt: string;
  content: string;
}

export const moodConfig: Record<MoodType, { emoji: string; label: string; color: string }> = {
  happy: { emoji: '😊', label: 'Happy', color: 'bg-mood-happy' },
  neutral: { emoji: '😐', label: 'Neutral', color: 'bg-mood-neutral' },
  stressed: { emoji: '😟', label: 'Stressed', color: 'bg-mood-stressed' },
  anxious: { emoji: '😰', label: 'Anxious', color: 'bg-mood-anxious' },
  tired: { emoji: '😴', label: 'Tired', color: 'bg-mood-tired' },
  angry: { emoji: '😡', label: 'Angry', color: 'bg-mood-angry' },
};
