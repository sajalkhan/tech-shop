import express, { Router } from 'express';
import { Product } from '@product/controllers/product';
import { authMiddleware } from '@global/helpers/auth-middleware';

class ProductRoutes {
  private router: Router;
  private product: Product; // Add this property

  constructor() {
    this.router = express.Router();
    this.product = new Product(); // Create an instance of the Product class
  }

  public routes(): Router {
    // Attach the create method with the correct instance
    this.router.post('/product', authMiddleware.verifyUser, authMiddleware.checkAdmin, this.product.create.bind(this.product));
    this.router.get('/products/:count', this.product.red.bind(this.product));
    this.router.get('/product/total', this.product.productCount.bind(this.product));
    this.router.delete('/product/:id', authMiddleware.verifyUser, authMiddleware.checkAdmin, this.product.delete.bind(this.product));
    this.router.get('/product/:id', this.product.productDetails.bind(this.product));
    this.router.put('/product/:title', authMiddleware.verifyUser, authMiddleware.checkAdmin, this.product.update.bind(this.product));
    this.router.put('/productRating', authMiddleware.verifyUser, this.product.productRating.bind(this.product));

    this.router.post('/products', this.product.productList.bind(this.product));
    return this.router;
  }
}

export const productRoutes: ProductRoutes = new ProductRoutes();
