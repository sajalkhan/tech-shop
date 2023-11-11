import { useState, useCallback } from 'react';
import { ROUTES } from '@/routes/constant';
import UserHistory from '@/pages/user/history';
import UserWishList from '@/pages/user/wishlist';
import UserPassword from '@/pages/user/updatePassword';
import UserNavigation from '@/components/atoms/userNavigation';

const User = () => {
  let content;
  const [route, setRoute] = useState('');

  switch (route) {
    case ROUTES.PASSWORD:
      content = <UserPassword />;
      break;
    case ROUTES.WISHLIST:
      content = <UserWishList />;
      break;
    default:
      content = <UserHistory />;
      break;
  }

  const handleRoute = useCallback((e: { key: React.Key }) => {
    setRoute(e.key as string);
  }, []);

  return <UserNavigation onClick={handleRoute}>{content}</UserNavigation>;
};

export default User;
