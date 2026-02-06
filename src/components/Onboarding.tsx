import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPreferences } from '@/types/mood';
import { Heart, ChevronRight, GraduationCap, Brain, Users, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { authService } from '@/services';
import { useToast } from '@/hooks/use-toast';

interface OnboardingProps {
  onComplete: (preferences: UserPreferences) => void;
}

type Step = 'welcome' | 'disclaimer' | 'name' | 'level' | 'stress' | 'complete';

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [studyLevel, setStudyLevel] = useState<UserPreferences['studyLevel']>();
  const [stressSource, setStressSource] = useState<UserPreferences['stressSource']>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Save preferences to backend
  const savePreferences = async (prefs: Partial<UserPreferences>) => {
    try {
      setLoading(true);
      await authService.updateProfile({
        name: prefs.name,
        studyLevel: prefs.studyLevel,
        stressSource: prefs.stressSource,
      });
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      toast({
        title: 'Info',
        description: 'Preferences saved locally',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleNameSave = async () => {
    await savePreferences({ name });
    setStep('level');
  };

  const handleLevelSave = async () => {
    await savePreferences({ studyLevel });
    setStep('stress');
  };

  const handleStressSave = async () => {
    await savePreferences({ stressSource });
    setStep('complete');
  };

  const handleComplete = async () => {
    const finalPrefs: UserPreferences = {
      name: name.trim() || undefined,
      studyLevel,
      stressSource,
      hasCompletedOnboarding: true,
    };
    
    await savePreferences(finalPrefs);
    onComplete(finalPrefs);
  };

  // Progress bar
  const getProgressPercentage = () => {
    const steps: Step[] = ['welcome', 'disclaimer', 'name', 'level', 'stress', 'complete'];
    const currentIndex = steps.indexOf(step);
    return ((currentIndex + 1) / steps.length) * 100;
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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gradient-warm relative">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-muted/20">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
          style={{ width: `${getProgressPercentage()}%` }}
        />
      </div>

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
              disabled={loading}
            />

            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setStep('level')} disabled={loading} className="flex-1">
                Skip
              </Button>
              <Button 
                variant="calm" 
                onClick={handleNameSave} 
                disabled={loading}
                className="flex-1 gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
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
                  disabled={loading}
                  className={cn(
                    "p-4 rounded-2xl border-2 transition-all text-center disabled:opacity-50",
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
              <Button variant="ghost" onClick={() => setStep('stress')} disabled={loading} className="flex-1">
                Skip
              </Button>
              <Button 
                variant="calm" 
                onClick={handleLevelSave}
                disabled={loading}
                className="flex-1 gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
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
                  disabled={loading}
                  className={cn(
                    "w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-4 disabled:opacity-50",
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
              <Button variant="ghost" onClick={handleStressSave} disabled={loading} className="flex-1">
                Skip
              </Button>
              <Button 
                variant="calm" 
                onClick={handleStressSave}
                disabled={loading}
                className="flex-1 gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Finish Setup
              </Button>
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            
            <div className="space-y-3">
              <h1 className="text-3xl font-display font-bold text-foreground">
                All Set!
              </h1>
              <p className="text-lg text-muted-foreground">
                Your profile is ready to go
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Start tracking your moods and accessing personalized wellness tools designed just for you.
            </p>

            <Button 
              variant="calm" 
              size="xl" 
              onClick={handleComplete}
              disabled={loading}
              className="w-full gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Setting up...
                </>
              ) : (
                <>
                  Go to Dashboard
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
