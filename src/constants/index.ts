// Mood constants
export const MOOD_EMOJIS = {
  happy: '😊',
  neutral: '😐',
  stressed: '😟',
  anxious: '😰',
  tired: '😴',
  angry: '😡',
} as const;

export const MOOD_COLORS = {
  happy: 'bg-mood-happy text-white',
  neutral: 'bg-mood-neutral text-white',
  stressed: 'bg-mood-stressed text-white',
  anxious: 'bg-mood-anxious text-white',
  tired: 'bg-mood-tired text-white',
  angry: 'bg-mood-angry text-white',
} as const;

export const MOOD_LABELS = {
  happy: 'Happy',
  neutral: 'Neutral',
  stressed: 'Stressed',
  anxious: 'Anxious',
  tired: 'Tired',
  angry: 'Angry',
} as const;

// Onboarding constants
export const STUDY_LEVELS = ['high-school', 'undergraduate', 'graduate', 'other'] as const;
export const STRESS_SOURCES = ['academics', 'personal', 'both'] as const;

// Storage keys
export const STORAGE_KEYS = {
  MOODS: 'mindmate-moods',
  JOURNAL: 'mindmate-journal',
  PREFERENCES: 'mindmate-preferences',
  ONBOARDING_COMPLETED: 'mindmate-onboarding-completed',
} as const;

// Greeting times
export const GREETING_TIMES = {
  morning: { start: 5, end: 12, greeting: 'Good morning' },
  afternoon: { start: 12, end: 17, greeting: 'Good afternoon' },
  evening: { start: 17, end: 21, greeting: 'Good evening' },
  night: { start: 21, end: 5, greeting: 'Good night' },
} as const;

// Journal prompts
export const JOURNAL_PROMPTS = [
  'What was the best part of your day?',
  'What are you grateful for today?',
  'How are you feeling and why?',
  'What challenge did you overcome today?',
  'What would make tomorrow better?',
  'What did you learn about yourself today?',
  'Who made you smile today and why?',
  'What are you worried about?',
] as const;
