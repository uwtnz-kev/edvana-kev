import { useAuth as useAuthContext } from '../context/AuthContext';

// Re-export the useAuth hook from context for easier imports
export const useAuth = useAuthContext;

// Additional auth-related hooks can be added here
export const useIsAuthenticated = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
};

export const useCurrentUser = () => {
  const { user } = useAuth();
  return user;
};

export const useUserRole = () => {
  const { user } = useAuth();
  return user?.role;
};

export const useHasRole = (role: string) => {
  const { user } = useAuth();
  return user?.role === role;
};

export const useHasPermission = (permission: string) => {
  const { user } = useAuth();
  // In a real app, you'd check user permissions here
  // For now, return true for demo purposes
  return true;
};