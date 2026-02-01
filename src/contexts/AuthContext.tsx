import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserPreferences } from '@/types/mood';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  userPreferences: UserPreferences | null;
  signOut: () => Promise<void>;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);

  useEffect(() => {
    // Check current session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Load user preferences from localStorage
          const saved = localStorage.getItem(`prefs-${session.user.id}`);
          if (saved) {
            setUserPreferences(JSON.parse(saved));
          } else {
            setUserPreferences({
              hasCompletedOnboarding: false,
            });
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (event === 'SIGNED_OUT') {
          setUserPreferences(null);
          localStorage.removeItem(`prefs-${session?.user?.id}`);
        } else if (session?.user) {
          const saved = localStorage.getItem(`prefs-${session.user.id}`);
          if (saved) {
            setUserPreferences(JSON.parse(saved));
          }
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setUserPreferences(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const updateUserPreferences = (preferences: Partial<UserPreferences>) => {
    if (user) {
      const updated = { ...userPreferences, ...preferences } as UserPreferences;
      setUserPreferences(updated);
      localStorage.setItem(`prefs-${user.id}`, JSON.stringify(updated));
    }
  };

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    isAuthenticated: !!session,
    userPreferences,
    signOut,
    updateUserPreferences,
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
