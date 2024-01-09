import { Flex, Spin } from 'antd';
import { Suspense, lazy } from 'react';
import { ROUTES } from '@/routes/constant';
import { UserRoute } from '@/routes/userRoute';
import { AdminRoute } from '@/routes/adminRoute';
import { Route, Routes } from 'react-router-dom';

const Demo = lazy(() => import('@/pages/demo'));
const Home = lazy(() => import('@/pages/home'));
const Login = lazy(() => import('@/pages/login'));
const Register = lazy(() => import('@/pages/register'));
const User = lazy(() => import('@/pages/user'));
const Admin = lazy(() => import('@/pages/admin'));
const ForgotPassword = lazy(() => import('@/pages/forgotPassword'));
const ResetPassword = lazy(() => import('@/pages/resetPassword'));

export const AppRouter = () => (
  <Suspense
    fallback={
      <Flex align="middle" justify="center" style={{ minHeight: '100vh' }}>
        <Spin size="large" />
      </Flex>
    }
  >
    <Routes>
      <Route path={ROUTES.DEMO} element={<Demo />} />
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
      <Route path={ROUTES.USER} element={<UserRoute>{<User />}</UserRoute>} />
      <Route path={ROUTES.ADMIN} element={<AdminRoute>{<Admin />}</AdminRoute>} />
    </Routes>
  </Suspense>
);
