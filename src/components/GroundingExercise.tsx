import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Hand, Ear, Flower2, Cookie, Check, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GroundingExerciseProps {
  className?: string;
}

const senses = [
  { id: 'see', count: 5, icon: Eye, label: 'SEE', instruction: 'Look around and name 5 things you can see' },
  { id: 'touch', count: 4, icon: Hand, label: 'TOUCH', instruction: 'Focus on 4 things you can physically feel' },
  { id: 'hear', count: 3, icon: Ear, label: 'HEAR', instruction: 'Listen for 3 sounds around you' },
  { id: 'smell', count: 2, icon: Flower2, label: 'SMELL', instruction: 'Notice 2 things you can smell' },
  { id: 'taste', count: 1, icon: Cookie, label: 'TASTE', instruction: 'Focus on 1 thing you can taste' },
];

export function GroundingExercise({ className }: GroundingExerciseProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isStarted, setIsStarted] = useState(false);

  const handleComplete = () => {
    const sense = senses[currentStep];
    setCompletedSteps([...completedSteps, sense.id]);
    
    if (currentStep < senses.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsStarted(false);
  };

  const isComplete = completedSteps.length === senses.length;
  const currentSense = senses[currentStep];

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <Hand className="w-5 h-5 text-primary" />
          5-4-3-2-1 Grounding
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isStarted ? (
          <div className="text-center py-6 space-y-4">
            <p className="text-muted-foreground">
              This technique helps ground you in the present moment by engaging all five senses.
            </p>
            <Button variant="calm" onClick={() => setIsStarted(true)}>
              Begin Exercise
            </Button>
          </div>
        ) : isComplete ? (
          <div className="text-center py-6 space-y-4 animate-fade-in">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-lg">Well Done!</h3>
            <p className="text-muted-foreground">
              You've completed the grounding exercise. Take a moment to notice how you feel.
            </p>
            <Button variant="outline" onClick={reset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Do Again
            </Button>
          </div>
        ) : (
          <>
            {/* Progress indicators */}
            <div className="flex justify-center gap-2">
              {senses.map((sense, index) => (
                <div
                  key={sense.id}
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                    completedSteps.includes(sense.id)
                      ? "bg-primary text-primary-foreground"
                      : index === currentStep
                      ? "bg-primary/20 text-primary border-2 border-primary"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {sense.count}
                </div>
              ))}
            </div>

            {/* Current sense */}
            <div className="text-center py-8 space-y-4 animate-fade-in" key={currentSense.id}>
              <div className="w-20 h-20 mx-auto rounded-full bg-secondary/50 flex items-center justify-center">
                <currentSense.icon className="w-10 h-10 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-4xl font-bold font-display text-primary">
                  {currentSense.count}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  things you can {currentSense.label.toLowerCase()}
                </p>
              </div>
              <p className="text-foreground max-w-xs mx-auto">
                {currentSense.instruction}
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              <Button variant="ghost" onClick={reset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button variant="calm" onClick={handleComplete}>
                <Check className="w-4 h-4 mr-2" />
                Done
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
