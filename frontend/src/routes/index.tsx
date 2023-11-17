import { Suspense, lazy } from 'react';
import { ROUTES } from '@/routes/constant';
import { UserRoute } from '@/routes/userRoute';
import { AdminRoute } from '@/routes/adminRoute';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('@/pages/home'));
const Login = lazy(() => import('@/pages/login'));
const Register = lazy(() => import('@/pages/register'));
const User = lazy(() => import('@/pages/user'));
const Admin = lazy(() => import('@/pages/admin'));

export const AppRouter = () => (
  <Suspense fallback="Loading...">
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.USER} element={<UserRoute>{<User />}</UserRoute>} />
      <Route path={ROUTES.ADMIN} element={<AdminRoute>{<Admin />}</AdminRoute>} />
    </Routes>
  </Suspense>
);
