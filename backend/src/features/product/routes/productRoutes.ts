import express, { Router } from 'express';
import { Product } from '@product/controllers/product';
import { authMiddleware } from '@global/helpers/auth-middleware';

class ProductRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/createProduct', authMiddleware.verifyUser, authMiddleware.checkAdmin, Product.prototype.create);
    return this.router;
  }
}

export const productRoutes: ProductRoutes = new ProductRoutes();
