import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface MoodEntry {
  _id: string;
  mood: string;
  note?: string;
  date: string;
}

interface JournalEntry {
  _id: string;
  prompt?: string;
  content: string;
  date: string;
}

interface MoodStats {
  total: number;
  byType: Record<string, number>;
  lastEntry?: MoodEntry;
}

interface JournalStats {
  total: number;
  lastEntry?: JournalEntry;
  totalWords: number;
}

export function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [moodStats, setMoodStats] = useState<MoodStats | null>(null);
  const [journalStats, setJournalStats] = useState<JournalStats | null>(null);
  const [recentMoods, setRecentMoods] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          navigate('/signin');
          return;
        }

        // Fetch mood stats
        const moodStatsRes = await fetch(`${import.meta.env.VITE_API_URL}/moods/stats`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (moodStatsRes.ok) {
          setMoodStats(await moodStatsRes.json());
        }

        // Fetch journal stats
        const journalStatsRes = await fetch(`${import.meta.env.VITE_API_URL}/journal/stats`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (journalStatsRes.ok) {
          setJournalStats(await journalStatsRes.json());
        }

        // Fetch recent moods
        const moodsRes = await fetch(`${import.meta.env.VITE_API_URL}/moods`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (moodsRes.ok) {
          const moods = await moodsRes.json();
          setRecentMoods(moods.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  const getMoodColor = (mood: string) => {
    const colors: Record<string, string> = {
      happy: 'bg-yellow-100 text-yellow-800',
      neutral: 'bg-gray-100 text-gray-800',
      stressed: 'bg-red-100 text-red-800',
      anxious: 'bg-purple-100 text-purple-800',
      tired: 'bg-blue-100 text-blue-800',
      angry: 'bg-orange-100 text-orange-800',
    };
    return colors[mood] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome, {user?.name}!</h1>
            <p className="text-gray-600">Your mental wellness dashboard</p>
            <p className="text-sm text-gray-500 mt-1">Email: {user?.email}</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/profile')}
              className="bg-white hover:bg-gray-50"
            >
              Edit Profile
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Mood Stats Card */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Mood Tracking</CardTitle>
              <CardDescription>Your mood entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-600 mb-4">
                {moodStats?.total || 0}
              </div>
              <p className="text-sm text-gray-600 mb-4">Total mood entries recorded</p>
              
              {moodStats?.byType && Object.keys(moodStats.byType).length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700">Breakdown:</p>
                  {Object.entries(moodStats.byType).map(([mood, count]) => (
                    <div key={mood} className="flex justify-between items-center text-sm">
                      <span className={`px-2 py-1 rounded capitalize ${getMoodColor(mood)}`}>
                        {mood}
                      </span>
                      <span className="text-gray-600 font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Journal Stats Card */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Journal Entries</CardTitle>
              <CardDescription>Your reflections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-4">
                {journalStats?.total || 0}
              </div>
              <p className="text-sm text-gray-600 mb-2">Total journal entries</p>
              <p className="text-sm text-gray-600">
                Total words written: <span className="font-semibold">{journalStats?.totalWords || 0}</span>
              </p>
            </CardContent>
          </Card>

          {/* Account Info Card */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Account Information</CardTitle>
              <CardDescription>Your profile details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">User ID</p>
                  <p className="font-mono text-xs text-gray-500 truncate">{user?._id}</p>
                </div>
                <div>
                  <p className="text-gray-600">Account Created</p>
                  <p className="text-gray-900">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Last Updated</p>
                  <p className="text-gray-900">
                    {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Moods */}
        {recentMoods.length > 0 && (
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Recent Mood Entries</CardTitle>
              <CardDescription>Your last 5 mood records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentMoods.map((entry) => (
                  <div key={entry._id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full capitalize font-medium ${getMoodColor(entry.mood)}`}>
                          {entry.mood}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(entry.date).toLocaleDateString()} {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      {entry.note && (
                        <p className="text-sm text-gray-600 mt-2">{entry.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate('/home')}>
            <CardHeader>
              <CardTitle>Record Mood</CardTitle>
              <CardDescription>How are you feeling today?</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Add Mood Entry
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate('/home')}>
            <CardHeader>
              <CardTitle>Write Journal</CardTitle>
              <CardDescription>Reflect on your day</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Start Journaling
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* User Preferences */}
        {user?.preferences && (Object.values(user.preferences).some(v => v)) && (
          <Card className="bg-white shadow-lg mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Your Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {user.preferences.studyLevel && (
                  <div>
                    <p className="text-gray-600">Study Level</p>
                    <p className="text-gray-900 font-medium capitalize">{user.preferences.studyLevel}</p>
                  </div>
                )}
                {user.preferences.stressSource && (
                  <div>
                    <p className="text-gray-600">Main Stress Source</p>
                    <p className="text-gray-900 font-medium capitalize">{user.preferences.stressSource}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-600">Onboarding Status</p>
                  <p className="text-gray-900 font-medium">
                    {user.preferences.hasCompletedOnboarding ? 'Completed' : 'In Progress'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
