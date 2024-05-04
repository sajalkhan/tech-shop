import express, { Router } from 'express';
import { SubCategory } from '@category/controllers/subCategory';
import { authMiddleware } from '@global/helpers/auth-middleware';

class SubCategoryRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/subCategory', authMiddleware.verifyUser, authMiddleware.checkAdmin, SubCategory.prototype.create);
    this.router.post('/subCategoriesById', SubCategory.prototype.subCategoryListByParentId);
    this.router.get('/subCategories', SubCategory.prototype.subCategoryList);
    this.router.get('/subCategory/:slug', SubCategory.prototype.red);
    this.router.get('/product/subCategory/:slug', SubCategory.prototype.getAllProductBySubCategory);
    this.router.put('/subCategory/:slug', authMiddleware.verifyUser, authMiddleware.checkAdmin, SubCategory.prototype.update);
    this.router.delete('/subCategory/:slug', authMiddleware.verifyUser, authMiddleware.checkAdmin, SubCategory.prototype.delete);
    return this.router;
  }
}

export const subCategoryRoutes: SubCategoryRoutes = new SubCategoryRoutes();
