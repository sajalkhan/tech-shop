import { Application } from 'express';
import { authRoutes } from '@auth/routes/authRoutes';
import { categoryRoutes } from '@category/routes/categoryRoutes';
import { subCategoryRoutes } from '@category/routes/subCategoryRoutes';
import { currentUserRoutes } from '@auth/routes/currentUserRoutes';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
  const routes = () => {
    // Authentication
    app.use(BASE_PATH, authRoutes.getRouter());
    app.use(BASE_PATH, currentUserRoutes.routes());

    // Category
    app.use(BASE_PATH, categoryRoutes.routes());
    // Sub Category
    app.use(BASE_PATH, subCategoryRoutes.routes());
  };
  routes();
};
