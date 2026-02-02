import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { UserPreferences } from '@/types/mood';

interface User {
  _id: string;
  email: string;
  name: string;
  preferences: UserPreferences;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  userPreferences: UserPreferences | null;
  signOut: () => Promise<void>;
  updateProfile: (name: string, preferences: Partial<UserPreferences>) => Promise<User>;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ token: string; user: User }>;
  signUp: (email: string, password: string, name: string) => Promise<{ token: string; user: User }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setUserPreferences(userData.preferences || null);
          } else {
            // Token is invalid, clear it
            localStorage.removeItem('auth_token');
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Sign in failed');
      }

      const { token, user: userData } = await response.json();
      localStorage.setItem('auth_token', token);
      setUser(userData);
      setUserPreferences(userData.preferences || null);
      return { token, user: userData };
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        throw new Error('Sign up failed');
      }

      const { token, user: userData } = await response.json();
      localStorage.setItem('auth_token', token);
      setUser(userData);
      setUserPreferences(userData.preferences || null);
      return { token, user: userData };
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      // Call logout endpoint for server-side session cleanup
      if (token) {
        await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }).catch(err => console.error('Logout API error:', err));
      }
      
      localStorage.removeItem('auth_token');
      setUser(null);
      setUserPreferences(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const updateProfile = async (name: string, preferences: Partial<UserPreferences>) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          preferences: { ...userPreferences, ...preferences },
        }),
      });

      if (!response.ok) {
        throw new Error('Profile update failed');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setUserPreferences(updatedUser.preferences || null);
      return updatedUser;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Password change failed');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  };

  const updateUserPreferences = (preferences: Partial<UserPreferences>) => {
    if (user) {
      const updated = { ...userPreferences, ...preferences } as UserPreferences;
      setUserPreferences(updated);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    userPreferences,
    signIn,
    signUp,
    signOut,
    updateProfile,
    updateUserPreferences,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
