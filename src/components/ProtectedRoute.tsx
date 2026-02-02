import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * ProtectedRoute component ensures that only authenticated users can access certain pages.
 * If user is not authenticated, they are redirected to the sign-in page.
 */
export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to sign-in if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/signin" replace />;
  }

  // Render protected content
  return <>{children}</>;
}

export default ProtectedRoute;
