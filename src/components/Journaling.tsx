import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PenLine, RefreshCw, Save, Check, Sparkles } from 'lucide-react';
import { JournalEntry } from '@/types/mood';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface JournalingProps {
  entries: JournalEntry[];
  onSave: (entry: Omit<JournalEntry, 'id'>) => void;
  className?: string;
}

const prompts = [
  "What went well today?",
  "What's worrying me most right now?",
  "What am I grateful for in this moment?",
  "What would make tomorrow better?",
  "How can I show myself kindness today?",
  "What's one small win I can celebrate?",
  "What's draining my energy, and what could help?",
  "If I could tell my stressed self one thing, what would it be?",
];

export function Journaling({ entries, onSave, className }: JournalingProps) {
  const [currentPrompt, setCurrentPrompt] = useState(prompts[0]);
  const [content, setContent] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const getNewPrompt = () => {
    let newPrompt = currentPrompt;
    while (newPrompt === currentPrompt) {
      newPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    }
    setCurrentPrompt(newPrompt);
    setContent('');
    setIsSaved(false);
  };

  const handleSave = () => {
    if (!content.trim()) return;
    
    onSave({
      date: new Date().toISOString(),
      prompt: currentPrompt,
      content: content.trim(),
    });
    
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setContent('');
      getNewPrompt();
    }, 2000);
  };

  const todayEntry = entries.find(
    (entry) => format(new Date(entry.date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <PenLine className="w-5 h-5 text-primary" />
          Journal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Prompt */}
        <div className="p-4 rounded-2xl bg-secondary/30 border border-secondary/50">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-secondary-foreground mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-foreground">{currentPrompt}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={getNewPrompt}
                className="mt-2 text-muted-foreground hover:text-foreground"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Different prompt
              </Button>
            </div>
          </div>
        </div>

        {/* Text area */}
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts here... Take your time, there's no rush."
          className="min-h-[150px] rounded-2xl resize-none bg-muted/30 border-border focus:border-primary/50"
        />

        {/* Save button */}
        <Button
          variant={isSaved ? "outline" : "calm"}
          onClick={handleSave}
          disabled={!content.trim() || isSaved}
          className="w-full"
        >
          {isSaved ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Entry
            </>
          )}
        </Button>

        {/* Today's entries */}
        {todayEntry && (
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Today's journal entry:</p>
            <div className="p-3 rounded-xl bg-muted/30 text-sm text-muted-foreground">
              <p className="font-medium text-foreground text-xs mb-1">{todayEntry.prompt}</p>
              <p className="line-clamp-2">{todayEntry.content}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
