import { MoodEntry, JournalEntry } from '@/types/mood';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper to get token
const getToken = () => localStorage.getItem('authToken');

// Auth Service
export const authService = {
  async signIn(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Sign in failed');
    }

    const data = await response.json();
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },

  async signUp(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Sign up failed');
    }

    const data = await response.json();
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },

  async signOut() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  async getProfile() {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
  },

  async updateProfile(data: any) {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
  },
};

// Mood Service
export const moodService = {
  async saveMood(entry: Omit<MoodEntry, 'id' | 'date'>) {
    const response = await fetch(`${API_URL}/moods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(entry),
    });

    if (!response.ok) throw new Error('Failed to save mood');
    return response.json();
  },

  async getMoods(): Promise<MoodEntry[]> {
    const response = await fetch(`${API_URL}/moods`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!response.ok) throw new Error('Failed to fetch moods');
    return response.json();
  },

  async deleteMood(moodId: string) {
    const response = await fetch(`${API_URL}/moods/${moodId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!response.ok) throw new Error('Failed to delete mood');
    return response.json();
  },
};

// Journal Service
export const journalService = {
  async saveEntry(entry: Omit<JournalEntry, 'id' | 'date'>) {
    const response = await fetch(`${API_URL}/journal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(entry),
    });

    if (!response.ok) throw new Error('Failed to save journal entry');
    return response.json();
  },

  async getEntries(): Promise<JournalEntry[]> {
    const response = await fetch(`${API_URL}/journal`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!response.ok) throw new Error('Failed to fetch journal entries');
    return response.json();
  },

  async deleteEntry(entryId: string) {
    const response = await fetch(`${API_URL}/journal/${entryId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!response.ok) throw new Error('Failed to delete journal entry');
    return response.json();
  },
};
