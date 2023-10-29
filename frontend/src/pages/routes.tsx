import { ROUTES } from 'constants/routes';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('pages/home'));
const Login = lazy(() => import('pages/login'));
const Register = lazy(() => import('pages/register'));

const PagesRoutes: React.FC = () => (
  <Suspense fallback="Loading...">
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
    </Routes>
  </Suspense>
);

export default React.memo(PagesRoutes);
