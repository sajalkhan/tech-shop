import { useEffect } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useGetCurrentAdminInfo } from '@/services/useGetCurrentAdmin';
import { LoadingToRedirect } from '@/components/atoms/loadingToRedirect';

interface UserRouteProps {
  children: React.ReactNode;
}

export const AdminRoute = ({ children }: UserRouteProps) => {
  const { data, refetch } = useGetCurrentAdminInfo();
  const token = useLocalStorage('techShopToken', 'get');

  useEffect(() => {
    if (!data?.isUser && token) refetch();
  }, [data, refetch, token]);

  return data && data.user.role === 'admin' ? <>{children}</> : <LoadingToRedirect />;
};
