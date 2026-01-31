import { useMemo } from 'react';
import { MoodEntry, moodConfig, MoodType } from '@/types/mood';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, subDays, isSameDay, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { BarChart3, Calendar } from 'lucide-react';

interface MoodHistoryProps {
  entries: MoodEntry[];
  className?: string;
}

export function MoodHistory({ entries, className }: MoodHistoryProps) {
  const last7Days = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      days.push(subDays(new Date(), i));
    }
    return days;
  }, []);

  const getMoodForDay = (date: Date) => {
    return entries.find(entry => isSameDay(parseISO(entry.date), date));
  };

  const moodSummary = useMemo(() => {
    const moodCounts: Record<MoodType, number> = {
      happy: 0,
      neutral: 0,
      stressed: 0,
      anxious: 0,
      tired: 0,
      angry: 0,
    };

    entries.slice(0, 7).forEach(entry => {
      moodCounts[entry.mood]++;
    });

    const mostCommon = Object.entries(moodCounts)
      .sort(([, a], [, b]) => b - a)
      .filter(([, count]) => count > 0)[0];

    return mostCommon ? { mood: mostCommon[0] as MoodType, count: mostCommon[1] } : null;
  }, [entries]);

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Your Week
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 7-day calendar view */}
        <div className="grid grid-cols-7 gap-2">
          {last7Days.map((date, index) => {
            const moodEntry = getMoodForDay(date);
            const isToday = isSameDay(date, new Date());

            return (
              <div key={index} className="flex flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground">
                  {format(date, 'EEE')}
                </span>
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all",
                    moodEntry
                      ? "bg-muted/50"
                      : isToday
                      ? "bg-primary/10 border-2 border-dashed border-primary/30"
                      : "bg-muted/20"
                  )}
                >
                  {moodEntry ? (
                    <span className="animate-scale-in">{moodConfig[moodEntry.mood].emoji}</span>
                  ) : isToday ? (
                    <span className="text-xs text-muted-foreground">?</span>
                  ) : (
                    <span className="text-xs text-muted-foreground/50">–</span>
                  )}
                </div>
                <span className={cn(
                  "text-xs",
                  isToday ? "text-primary font-medium" : "text-muted-foreground"
                )}>
                  {format(date, 'd')}
                </span>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        {moodSummary && entries.length > 0 && (
          <div className="p-4 rounded-2xl bg-muted/30 border border-border">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Weekly Insight
                </p>
                <p className="text-sm text-muted-foreground">
                  You felt{' '}
                  <span className="font-medium text-foreground">
                    {moodConfig[moodSummary.mood].emoji} {moodConfig[moodSummary.mood].label.toLowerCase()}
                  </span>{' '}
                  most often this week ({moodSummary.count} {moodSummary.count === 1 ? 'time' : 'times'})
                </p>
              </div>
            </div>
          </div>
        )}

        {entries.length === 0 && (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              Start tracking your moods to see insights here
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
