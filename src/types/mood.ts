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

export const moodConfig: Record<MoodType, { label: string; color: string }> = {
  happy: { label: 'Happy', color: 'bg-mood-happy' },
  neutral: { label: 'Neutral', color: 'bg-mood-neutral' },
  stressed: { label: 'Stressed', color: 'bg-mood-stressed' },
  anxious: { label: 'Anxious', color: 'bg-mood-anxious' },
  tired: { label: 'Tired', color: 'bg-mood-tired' },
  angry: { label: 'Angry', color: 'bg-mood-angry' },
};
