/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback } from 'react';
import { message } from 'antd';
import { AppRouter } from '@/routes';
import { ROUTES } from '@/routes/constant';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import Navigation from '@/components/atoms/navigation';
import { useLogoutUser } from '@/services/useLogoutUser';
import { useGetCurrentUserInfo } from '@/services/useGetCurrentUser';

import useLocalStorage from '@/hooks/useLocalStorage';

const App: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: logoutUser } = useLogoutUser();
  const { addUser, removeUser } = useUserStore();
  const token = useLocalStorage('techShopToken', 'get');
  const [deleteToken] = useLocalStorage('techShopToken', 'delete');

  const { data: userDetails, refetch: refetchUserInfo } = useGetCurrentUserInfo();
  const handleRoute = useCallback((e: { key: React.Key }) => navigate(`${e.key}`), []);

  useEffect(() => {
    if (!userDetails?.isUser && token) refetchUserInfo();
    if (userDetails?.isUser) addUser({ ...userDetails?.user, token: userDetails?.token });
  }, [userDetails]);

  const handleLogout = () => {
    logoutUser(undefined, {
      onSuccess: () => {
        removeUser();
        deleteToken();
        navigate(ROUTES.LOGIN);
        message.success('User Logout successfully!');
      },
    });
  };

  return (
    <>
      <Navigation onClick={handleRoute} logout={handleLogout} />
      <AppRouter />
    </>
  );
};

export default App;
