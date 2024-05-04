import express, { Router } from 'express';
import { Category } from '@category/controllers/category';
import { authMiddleware } from '@global/helpers/auth-middleware';

class CategoryRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/category', authMiddleware.verifyUser, authMiddleware.checkAdmin, Category.prototype.create);
    this.router.get('/categories', Category.prototype.categoryList);
    this.router.get('/category/:slug', Category.prototype.red);
    this.router.get('/product/category/:slug', Category.prototype.getAllProductByCategory);
    this.router.put('/category/:slug', authMiddleware.verifyUser, authMiddleware.checkAdmin, Category.prototype.update);
    this.router.delete('/category/:slug', authMiddleware.verifyUser, authMiddleware.checkAdmin, Category.prototype.delete);
    return this.router;
  }
}

export const categoryRoutes: CategoryRoutes = new CategoryRoutes();
