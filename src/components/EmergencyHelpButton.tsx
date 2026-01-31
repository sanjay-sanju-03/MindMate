import { useState } from 'react';
import { Phone, Heart, X, MessageCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const helplines = [
  {
    name: 'iCall (India)',
    number: '9152987821',
    description: 'Psychosocial helpline for students',
  },
  {
    name: 'Vandrevala Foundation',
    number: '1860-2662-345',
    description: '24/7 mental health support',
  },
  {
    name: 'NIMHANS Helpline',
    number: '080-46110007',
    description: 'National mental health resources',
  },
  {
    name: 'International Association for Suicide Prevention',
    number: 'findahelpline.com',
    description: 'Find helplines in your country',
    isLink: true,
  },
];

export function EmergencyHelpButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="emergency"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 shadow-lg animate-pulse-soft hover:animate-none"
      >
        <Heart className="w-4 h-4" />
        Need Help?
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-display flex items-center gap-2">
              <Heart className="w-5 h-5 text-accent" />
              You're Not Alone
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              If you're in crisis or need immediate support, please reach out.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="p-4 rounded-2xl bg-muted/50 border border-border">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Talk to Someone You Trust</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    A friend, family member, teacher, or counselor can help. You don't have to face this alone.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Crisis Helplines
              </p>
              
              {helplines.map((helpline) => (
                <div
                  key={helpline.name}
                  className="p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">{helpline.name}</p>
                      <p className="text-xs text-muted-foreground">{helpline.description}</p>
                    </div>
                    {helpline.isLink ? (
                      <a
                        href={`https://${helpline.number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-sm font-medium hover:underline"
                      >
                        Visit
                      </a>
                    ) : (
                      <a
                        href={`tel:${helpline.number}`}
                        className="text-primary text-sm font-medium hover:underline"
                      >
                        {helpline.number}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-center text-muted-foreground pt-2">
              Remember: MindMate is a wellness tool, not a substitute for professional help.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
