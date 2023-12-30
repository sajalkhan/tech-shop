import slugify from 'slugify';
import { MongoError } from 'mongodb';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { productService } from '@service/db/product.service';
import { ProductValidationSchema } from '@product/validation-schema/product';
import { joiValidation } from '@global/decorators/joi-validation-decorator';

export class Product {
  @joiValidation(ProductValidationSchema)
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, price, shipping, quantity, color, brand, category, subCategory } = req.body;
      const slug = slugify(title);
      const data = { title, description, price, slug, shipping, quantity, color, brand, category, subCategory };

      await productService.createProduct(data as never);

      res.status(HTTP_STATUS.CREATED).json({ message: 'Product Created successfully', data });
    } catch (error) {
      if (error instanceof MongoError && error.code === 11000) {
        const duplicateKeyInfo = /index: ([\w\d_]+).*dup key: { ([\w\d_]+): "([^"]+)" }/.exec(error.message);
        if (duplicateKeyInfo) {
          const [, indexName, keyName, keyValue] = duplicateKeyInfo;
          const errorMessage = `Duplicate key error in index '${indexName}'. The value '${keyValue}' for key '${keyName}' is already taken.`;
          res.status(HTTP_STATUS.CONFLICT).json({ message: errorMessage });
          return; // Return early to prevent further processing
        }
      }

      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  }
}
