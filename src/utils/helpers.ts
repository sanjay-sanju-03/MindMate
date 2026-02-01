import { GREETING_TIMES, JOURNAL_PROMPTS } from '@/constants';

export function getGreeting(name?: string): string {
  const hour = new Date().getHours();
  let timeOfDay = 'day';

  for (const [, { start, end, greeting }] of Object.entries(GREETING_TIMES)) {
    if (start <= end) {
      if (hour >= start && hour < end) {
        timeOfDay = greeting;
        break;
      }
    } else {
      if (hour >= start || hour < end) {
        timeOfDay = greeting;
        break;
      }
    }
  }

  return name ? `${timeOfDay}, ${name}!` : `${timeOfDay}!`;
}

export function getRandomJournalPrompt(): string {
  return JOURNAL_PROMPTS[Math.floor(Math.random() * JOURNAL_PROMPTS.length)];
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function getWeekDays(): string[] {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const weekDays = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    weekDays.push(days[date.getDay()]);
  }

  return weekDays;
}

export function getMoodStats(moodCounts: Record<string, number>) {
  const total = Object.values(moodCounts).reduce((a, b) => a + b, 0);
  return {
    total,
    dominant: Object.entries(moodCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || 'neutral',
    percentage: (mood: string) => total > 0 ? Math.round((moodCounts[mood] / total) * 100) : 0,
  };
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 6) {
    return { valid: false, error: 'Password must be at least 6 characters' };
  }
  return { valid: true };
}
