import { Application } from 'express';
import { authRoutes } from '@auth/routes/authRoutes';
import { currentUserRoutes } from '@auth/routes/currentUserRoutes';

const BASE_PATH = '/api/v1';
import { authMiddleware } from '@global/helpers/auth-middleware';

export default (app: Application) => {
  const routes = () => {
    app.use(BASE_PATH, authRoutes.getRouter());
    app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.routes());
  };
  routes();
};
