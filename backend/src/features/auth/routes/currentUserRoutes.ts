import { CurrentUser } from '@auth/controllers/current-user';
import { authMiddleware } from '@global/helpers/auth-middleware';
import express, { Router } from 'express';

class CurrentUserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/currentUser', authMiddleware.checkAuthentication, CurrentUser.prototype.currentUserInfo);
    this.router.get('/currentAdmin', authMiddleware.checkAuthentication, CurrentUser.prototype.currentAdminInfo);

    return this.router;
  }
}

export const currentUserRoutes: CurrentUserRoutes = new CurrentUserRoutes();
