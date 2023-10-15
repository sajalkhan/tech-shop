import { ROUTES } from 'constants/routes';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('pages/home'));
const Users = lazy(() => import('pages/users'));
// const NotFound = lazy(() => import('pages/not-found'));

export const PagesRoutes: React.FC = () => (
  <Suspense fallback="Loading...">
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.USERS} element={<Users />} />
      {/* <Route component={<NotFound />} /> */}
    </Routes>
  </Suspense>
);
