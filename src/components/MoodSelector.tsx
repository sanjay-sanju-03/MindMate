import { useState } from 'react';
import { MoodType, moodConfig } from '@/types/mood';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface MoodSelectorProps {
  onSubmit: (mood: MoodType, note?: string) => void;
  className?: string;
}

export function MoodSelector({ onSubmit, className }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedMood) return;
    setIsSubmitting(true);
    
    // Small delay for animation
    await new Promise(resolve => setTimeout(resolve, 300));
    
    onSubmit(selectedMood, note.trim() || undefined);
    setSelectedMood(null);
    setNote('');
    setIsSubmitting(false);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h3 className="text-lg font-display font-semibold text-foreground mb-2">
          How are you feeling right now?
        </h3>
        <p className="text-sm text-muted-foreground">
          Select the mood that best describes your current state
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {(Object.entries(moodConfig) as [MoodType, typeof moodConfig.happy][]).map(([mood, config]) => (
          <button
            key={mood}
            onClick={() => setSelectedMood(mood)}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105",
              selectedMood === mood
                ? "border-primary bg-primary/10 shadow-glow"
                : "border-transparent bg-muted/30 hover:bg-muted/50 hover:border-primary/20"
            )}
          >
            <span className="text-4xl animate-float" style={{ animationDelay: `${Math.random() * 2}s` }}>
              {config.emoji}
            </span>
            <span className="text-xs font-medium text-foreground">{config.label}</span>
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="space-y-4 animate-slide-up">
          <div>
            <label htmlFor="mood-note" className="block text-sm font-medium text-foreground mb-2">
              What's on your mind today? <span className="text-muted-foreground">(optional)</span>
            </label>
            <Textarea
              id="mood-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Share your thoughts, feelings, or anything that's happening..."
              className="min-h-[100px] rounded-2xl resize-none bg-muted/30 border-border focus:border-primary/50"
            />
          </div>

          <Button
            variant="calm"
            size="lg"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="animate-pulse">Saving...</span>
              </span>
            ) : (
              `Log ${moodConfig[selectedMood].emoji} ${moodConfig[selectedMood].label} Mood`
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
