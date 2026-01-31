import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoodSelector } from './MoodSelector';
import { MoodHistory } from './MoodHistory';
import { BreathingExercise } from './BreathingExercise';
import { GroundingExercise } from './GroundingExercise';
import { Journaling } from './Journaling';
import { SupportChat } from './SupportChat';
import { MoodEntry, MoodType, UserPreferences, JournalEntry, moodConfig } from '@/types/mood';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Wind, 
  PenLine, 
  Calendar, 
  Sparkles,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, isToday } from 'date-fns';

interface DashboardProps {
  preferences: UserPreferences;
}

type Tab = 'home' | 'chat' | 'tools' | 'journal' | 'history';

export function Dashboard({ preferences }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [moodEntries, setMoodEntries] = useLocalStorage<MoodEntry[]>('mindmate-moods', []);
  const [journalEntries, setJournalEntries] = useLocalStorage<JournalEntry[]>('mindmate-journal', []);
  const [showMoodSuccess, setShowMoodSuccess] = useState(false);

  const todaysMood = moodEntries.find(entry => isToday(new Date(entry.date)));
  const greeting = getGreeting(preferences.name);

  const handleMoodSubmit = (mood: MoodType, note?: string) => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      time: format(new Date(), 'HH:mm'),
      mood,
      note,
    };

    setMoodEntries(prev => [newEntry, ...prev.filter(e => !isToday(new Date(e.date)))]);
    setShowMoodSuccess(true);
    setTimeout(() => setShowMoodSuccess(false), 3000);
  };

  const handleJournalSave = (entry: Omit<JournalEntry, 'id'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    setJournalEntries(prev => [newEntry, ...prev]);
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'tools', label: 'Tools', icon: Wind },
    { id: 'journal', label: 'Journal', icon: PenLine },
    { id: 'history', label: 'History', icon: Calendar },
  ] as const;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-display font-bold text-foreground">MindMate</h1>
              <p className="text-sm text-muted-foreground">{greeting}</p>
            </div>
            {todaysMood && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50">
                <span className="text-lg">{moodConfig[todaysMood.mood].emoji}</span>
                <span className="text-xs text-muted-foreground">Today</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        {activeTab === 'home' && (
          <div className="space-y-6 animate-fade-in">
            {/* Success message */}
            {showMoodSuccess && (
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30 flex items-center gap-3 animate-slide-up">
                <Sparkles className="w-5 h-5 text-primary" />
                <p className="text-sm font-medium text-primary">
                  Your mood has been logged! Take care of yourself today.
                </p>
              </div>
            )}

            {/* Mood Check-in Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-display flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Daily Check-In
                </CardTitle>
              </CardHeader>
              <CardContent>
                {todaysMood ? (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-full bg-muted/50 flex items-center justify-center">
                      <span className="text-5xl">{moodConfig[todaysMood.mood].emoji}</span>
                    </div>
                    <div>
                      <p className="font-medium">You're feeling {moodConfig[todaysMood.mood].label.toLowerCase()} today</p>
                      {todaysMood.note && (
                        <p className="text-sm text-muted-foreground mt-2 italic">"{todaysMood.note}"</p>
                      )}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => {
                      setMoodEntries(prev => prev.filter(e => e.id !== todaysMood.id));
                    }}>
                      Update mood
                    </Button>
                  </div>
                ) : (
                  <MoodSelector onSubmit={handleMoodSubmit} />
                )}
              </CardContent>
            </Card>

            {/* Quick access cards */}
            <div className="grid grid-cols-2 gap-4">
              <QuickAccessCard
                icon={MessageCircle}
                title="Talk to MindMate"
                description="AI support chat"
                onClick={() => setActiveTab('chat')}
                highlight
              />
              <QuickAccessCard
                icon={Wind}
                title="Calm Down"
                description="Breathing exercises"
                onClick={() => setActiveTab('tools')}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <QuickAccessCard
                icon={PenLine}
                title="Reflect"
                description="Journal prompts"
                onClick={() => setActiveTab('journal')}
              />
              <QuickAccessCard
                icon={Calendar}
                title="Your Week"
                description="Mood history"
                onClick={() => setActiveTab('history')}
              />
            </div>

            {/* Mood History Preview */}
            <MoodHistory entries={moodEntries} />
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="animate-fade-in">
            <SupportChat 
              currentMood={todaysMood?.mood} 
              onBack={() => setActiveTab('home')} 
            />
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-6 animate-fade-in">
            <BreathingExercise />
            <GroundingExercise />
          </div>
        )}

        {activeTab === 'journal' && (
          <div className="animate-fade-in">
            <Journaling entries={journalEntries} onSave={handleJournalSave} />
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6 animate-fade-in">
            <MoodHistory entries={moodEntries} />
            
            {/* Recent entries list */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-display">Recent Check-ins</CardTitle>
              </CardHeader>
              <CardContent>
                {moodEntries.length === 0 ? (
                  <p className="text-center text-muted-foreground py-6">
                    No mood entries yet. Start tracking to see your history!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {moodEntries.slice(0, 10).map((entry) => (
                      <div
                        key={entry.id}
                        className="flex items-center gap-4 p-3 rounded-xl bg-muted/30"
                      >
                        <span className="text-2xl">{moodConfig[entry.mood].emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{moodConfig[entry.mood].label}</p>
                          {entry.note && (
                            <p className="text-xs text-muted-foreground truncate">{entry.note}</p>
                          )}
                        </div>
                        <div className="text-right text-xs text-muted-foreground">
                          <p>{format(new Date(entry.date), 'MMM d')}</p>
                          <p>{entry.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border">
        <div className="container">
          <div className="flex justify-around py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all",
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon className={cn(
                  "w-5 h-5 transition-transform",
                  activeTab === tab.id && "scale-110"
                )} />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}

function QuickAccessCard({
  icon: Icon,
  title,
  description,
  onClick,
  highlight,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
  highlight?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-4 rounded-2xl border hover:shadow-soft transition-all text-left group",
        highlight 
          ? "bg-primary/10 border-primary/30 hover:border-primary/50" 
          : "bg-card border-border hover:border-primary/30"
      )}
    >
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors",
        highlight 
          ? "gradient-breathing" 
          : "bg-primary/10 group-hover:bg-primary/20"
      )}>
        <Icon className={cn(
          "w-5 h-5",
          highlight ? "text-primary-foreground" : "text-primary"
        )} />
      </div>
      <p className="font-medium text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      <ChevronRight className="w-4 h-4 text-muted-foreground mt-2 group-hover:translate-x-1 transition-transform" />
    </button>
  );
}

function getGreeting(name?: string): string {
  const hour = new Date().getHours();
  let greeting = 'Hello';
  
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 17) greeting = 'Good afternoon';
  else greeting = 'Good evening';
  
  return name ? `${greeting}, ${name}` : greeting;
}
