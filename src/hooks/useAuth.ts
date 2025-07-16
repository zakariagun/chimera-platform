import { useUser } from '@/contexts/UserContext';

export const useAuth = () => {
  const { user, login, logout, isAuthenticated, isLoading } = useUser();

  return {
    user,
    login,
    logout,
    isAuthenticated,
    isLoading,
    isGuest: !isAuthenticated,
  };
};
