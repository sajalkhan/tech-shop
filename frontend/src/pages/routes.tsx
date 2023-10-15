import { ROUTES } from 'constants/routes';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('pages/home'));
const Register = lazy(() => import('pages/register'));

export const PagesRoutes: React.FC = () => (
  <Suspense fallback="Loading...">
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
    </Routes>
  </Suspense>
);
