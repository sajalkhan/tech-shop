import { useState, useCallback } from 'react';
import { ROUTES } from '@/routes/constant';
import Product from '@/pages/admin/product';
import Products from '@/pages/admin/products';
import Category from '@/pages/admin/category';
import SubCategory from '@/pages/admin/sub-category';
import Coupon from '@/pages/admin/coupon';
import UserPassword from '@/pages/user/updatePassword';
import AdminNavigation from '@/components/atoms/adminNavigation';

const Admin = () => {
  let content;
  const [route, setRoute] = useState('');

  switch (route) {
    case ROUTES.PRODUCTS:
      content = <Products />;
      break;
    case ROUTES.CATEGORY:
      content = <Category />;
      break;
    case ROUTES.SUB_CATEGORY:
      content = <SubCategory />;
      break;
    case ROUTES.COUPON:
      content = <Coupon />;
      break;
    case ROUTES.PASSWORD:
      content = <UserPassword />;
      break;
    default:
      content = <Product />;
      break;
  }

  const handleRoute = useCallback((e: { key: React.Key }) => {
    setRoute(e.key as string);
  }, []);

  return <AdminNavigation onClick={handleRoute}>{content}</AdminNavigation>;
};

export default Admin;
