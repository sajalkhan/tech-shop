import { RouteProps } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { LoadingToRedirect } from '@/components/atoms/loadingToRedirect';

interface UserRouteProps extends RouteProps {
  children: React.ReactNode;
}

export const UserRoute = ({ children }: UserRouteProps) => {
  const { user } = useUserStore();

  return user && user.token ? <>{children}</> : <LoadingToRedirect />;
};
