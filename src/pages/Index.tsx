import { Onboarding } from '@/components/Onboarding';
import { Dashboard } from '@/components/Dashboard';
import { EmergencyHelpButton } from '@/components/EmergencyHelpButton';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { UserPreferences } from '@/types/mood';

const Index = () => {
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>('mindmate-preferences', {
    hasCompletedOnboarding: false,
  });

  const handleOnboardingComplete = (prefs: UserPreferences) => {
    setPreferences(prefs);
  };

  return (
    <>
      {!preferences.hasCompletedOnboarding ? (
        <Onboarding onComplete={handleOnboardingComplete} />
      ) : (
        <Dashboard preferences={preferences} />
      )}
      <EmergencyHelpButton />
    </>
  );
};

export default Index;
