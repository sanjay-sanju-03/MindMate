import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wind, Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreathingExerciseProps {
  className?: string;
}

type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'rest';
type ExerciseType = '4-4-6' | 'box';

const exercises: Record<ExerciseType, { name: string; phases: Record<BreathingPhase, number> }> = {
  '4-4-6': {
    name: 'Calm Breathing (4-4-6)',
    phases: { inhale: 4, hold: 4, exhale: 6, rest: 0 },
  },
  'box': {
    name: 'Box Breathing (4-4-4-4)',
    phases: { inhale: 4, hold: 4, exhale: 4, rest: 4 },
  },
};

const phaseInstructions: Record<BreathingPhase, string> = {
  inhale: 'Breathe in slowly...',
  hold: 'Hold gently...',
  exhale: 'Breathe out slowly...',
  rest: 'Rest...',
};

export function BreathingExercise({ className }: BreathingExerciseProps) {
  const [exerciseType, setExerciseType] = useState<ExerciseType>('4-4-6');
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase>('inhale');
  const [countdown, setCountdown] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  const exercise = exercises[exerciseType];

  const getNextPhase = useCallback((phase: BreathingPhase): BreathingPhase => {
    const order: BreathingPhase[] = ['inhale', 'hold', 'exhale', 'rest'];
    const currentIndex = order.indexOf(phase);
    let nextIndex = (currentIndex + 1) % order.length;
    
    // Skip phases with 0 duration
    while (exercise.phases[order[nextIndex]] === 0) {
      nextIndex = (nextIndex + 1) % order.length;
    }
    
    return order[nextIndex];
  }, [exercise]);

  const startExercise = () => {
    setIsRunning(true);
    setCurrentPhase('inhale');
    setCountdown(exercise.phases.inhale);
    setCycleCount(0);
  };

  const stopExercise = () => {
    setIsRunning(false);
    setCurrentPhase('inhale');
    setCountdown(0);
    setCycleCount(0);
  };

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          const nextPhase = getNextPhase(currentPhase);
          
          if (nextPhase === 'inhale') {
            setCycleCount((c) => c + 1);
          }
          
          setCurrentPhase(nextPhase);
          return exercise.phases[nextPhase];
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, currentPhase, exercise, getNextPhase]);

  const getCircleScale = () => {
    if (!isRunning) return 1;
    if (currentPhase === 'inhale') return 1.3;
    if (currentPhase === 'exhale') return 0.8;
    return 1;
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <Wind className="w-5 h-5 text-primary" />
          Breathing Exercise
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Exercise selector */}
        <div className="flex gap-2">
          {(Object.entries(exercises) as [ExerciseType, typeof exercises['4-4-6']][]).map(([type, ex]) => (
            <Button
              key={type}
              variant={exerciseType === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                if (!isRunning) {
                  setExerciseType(type);
                }
              }}
              disabled={isRunning}
              className="flex-1"
            >
              {ex.name.split(' ')[0]}
            </Button>
          ))}
        </div>

        {/* Breathing circle */}
        <div className="flex flex-col items-center py-8">
          <div
            className={cn(
              "w-40 h-40 rounded-full flex items-center justify-center transition-transform",
              isRunning ? "duration-1000" : "duration-300"
            )}
            style={{
              transform: `scale(${getCircleScale()})`,
              background: 'var(--gradient-breathing)',
              boxShadow: isRunning ? 'var(--shadow-glow)' : 'var(--shadow-soft)',
            }}
          >
            <div className="text-center text-primary-foreground">
              {isRunning ? (
                <>
                  <div className="text-4xl font-bold">{countdown}</div>
                  <div className="text-sm mt-1 opacity-90 capitalize">{currentPhase}</div>
                </>
              ) : (
                <div className="text-sm font-medium">Ready</div>
              )}
            </div>
          </div>

          {isRunning && (
            <p className="mt-6 text-center text-muted-foreground animate-fade-in">
              {phaseInstructions[currentPhase]}
            </p>
          )}

          {cycleCount > 0 && (
            <p className="mt-2 text-sm text-muted-foreground">
              Cycle {cycleCount} completed
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-3 justify-center">
          {!isRunning ? (
            <Button variant="calm" size="lg" onClick={startExercise}>
              <Play className="w-4 h-4 mr-2" />
              Start
            </Button>
          ) : (
            <>
              <Button variant="outline" size="lg" onClick={stopExercise}>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </Button>
              <Button variant="ghost" size="lg" onClick={stopExercise}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
