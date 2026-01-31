import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPreferences } from '@/types/mood';
import { Heart, ChevronRight, GraduationCap, Brain, Users, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingProps {
  onComplete: (preferences: UserPreferences) => void;
}

type Step = 'welcome' | 'disclaimer' | 'name' | 'level' | 'stress' | 'complete';

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [studyLevel, setStudyLevel] = useState<UserPreferences['studyLevel']>();
  const [stressSource, setStressSource] = useState<UserPreferences['stressSource']>();

  const handleComplete = () => {
    onComplete({
      name: name.trim() || undefined,
      studyLevel,
      stressSource,
      hasCompletedOnboarding: true,
    });
  };

  const studyLevels = [
    { value: 'high-school', label: 'High School', icon: '📚' },
    { value: 'undergraduate', label: 'Undergraduate', icon: '🎓' },
    { value: 'graduate', label: 'Graduate', icon: '📖' },
    { value: 'other', label: 'Other', icon: '✨' },
  ] as const;

  const stressSources = [
    { value: 'academics', label: 'Academics', description: 'Exams, assignments, grades', icon: GraduationCap },
    { value: 'personal', label: 'Personal', description: 'Relationships, health, life', icon: Users },
    { value: 'both', label: 'Both', description: 'A mix of everything', icon: Brain },
  ] as const;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 gradient-warm">
      <div className="w-full max-w-md">
        {step === 'welcome' && (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="w-24 h-24 mx-auto rounded-full gradient-breathing flex items-center justify-center shadow-glow animate-breathe">
              <Heart className="w-12 h-12 text-primary-foreground" />
            </div>
            
            <div className="space-y-3">
              <h1 className="text-4xl font-display font-bold text-foreground">
                MindMate
              </h1>
              <p className="text-lg text-muted-foreground">
                Your calm companion for student life
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              A supportive space to track your moods, find calm, and practice self-care during stressful times.
            </p>

            <Button variant="calm" size="xl" onClick={() => setStep('disclaimer')} className="w-full">
              Get Started
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {step === 'disclaimer' && (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-display font-semibold">Important Note</h2>
              <p className="text-muted-foreground">Please read before continuing</p>
            </div>

            <div className="p-6 rounded-3xl bg-card/80 border border-border shadow-soft space-y-4">
              <div className="flex gap-3">
                <Heart className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Wellness Support, Not Medical Advice</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    MindMate is a mental wellness support tool designed to help you manage everyday stress and practice self-care.
                  </p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">This is not:</strong>
                </p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• A replacement for professional therapy</li>
                  <li>• Medical or psychiatric advice</li>
                  <li>• A crisis intervention service</li>
                </ul>
              </div>

              <p className="text-sm text-muted-foreground">
                If you're experiencing a mental health crisis, please reach out to a professional or use the emergency resources available in the app.
              </p>
            </div>

            <Button variant="calm" size="lg" onClick={() => setStep('name')} className="w-full">
              I Understand
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {step === 'name' && (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center space-y-2">
              <Sparkles className="w-8 h-8 mx-auto text-primary" />
              <h2 className="text-2xl font-display font-semibold">What should we call you?</h2>
              <p className="text-muted-foreground">This helps personalize your experience</p>
            </div>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name or nickname"
              className="text-center text-lg h-14 rounded-2xl bg-muted/30"
            />

            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setStep('level')} className="flex-1">
                Skip
              </Button>
              <Button variant="calm" onClick={() => setStep('level')} className="flex-1">
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 'level' && (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center space-y-2">
              <GraduationCap className="w-8 h-8 mx-auto text-primary" />
              <h2 className="text-2xl font-display font-semibold">Where are you studying?</h2>
              <p className="text-muted-foreground">Optional – helps tailor our suggestions</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {studyLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setStudyLevel(level.value)}
                  className={cn(
                    "p-4 rounded-2xl border-2 transition-all text-center",
                    studyLevel === level.value
                      ? "border-primary bg-primary/10"
                      : "border-transparent bg-muted/30 hover:bg-muted/50"
                  )}
                >
                  <span className="text-2xl block mb-1">{level.icon}</span>
                  <span className="text-sm font-medium">{level.label}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setStep('stress')} className="flex-1">
                Skip
              </Button>
              <Button variant="calm" onClick={() => setStep('stress')} className="flex-1">
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 'stress' && (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center space-y-2">
              <Brain className="w-8 h-8 mx-auto text-primary" />
              <h2 className="text-2xl font-display font-semibold">What stresses you most?</h2>
              <p className="text-muted-foreground">This helps us suggest relevant tools</p>
            </div>

            <div className="space-y-3">
              {stressSources.map((source) => (
                <button
                  key={source.value}
                  onClick={() => setStressSource(source.value)}
                  className={cn(
                    "w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-4",
                    stressSource === source.value
                      ? "border-primary bg-primary/10"
                      : "border-transparent bg-muted/30 hover:bg-muted/50"
                  )}
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center">
                    <source.icon className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{source.label}</p>
                    <p className="text-sm text-muted-foreground">{source.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="ghost" onClick={handleComplete} className="flex-1">
                Skip
              </Button>
              <Button variant="calm" onClick={handleComplete} className="flex-1">
                Finish Setup
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
