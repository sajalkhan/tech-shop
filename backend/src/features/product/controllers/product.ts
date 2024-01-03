import slugify from 'slugify';
import { MongoError } from 'mongodb';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { uploads } from '@global/helpers/coludinary-upload';
import { productService } from '@service/db/product.service';
import { BadRequestError } from '@global/helpers/error-handler';
import { ProductValidationSchema } from '@product/validation-schema/product';
import { joiValidation } from '@global/decorators/joi-validation-decorator';

export class Product {
  @joiValidation(ProductValidationSchema)
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { images, title, description, price, shipping, quantity, color, brand, category, subCategory } = req.body;
      const slug = slugify(title);
      const productData = { images, title, description, price, slug, shipping, quantity, color, brand, category, subCategory };

      const imageUrls = await this.uploadImages(images);

      // Add the imageUrls to the productData
      productData.images = imageUrls;

      await productService.createProduct(productData as never);

      res.status(HTTP_STATUS.CREATED).json({ message: 'Product Created successfully', data: productData });
    } catch (error) {
      this.handleCreateError(error, res);
    }
  }

  public async red(req: Request, res: Response): Promise<void> {
    const { count } = req.params;
    const products = await productService.getProductsByCount(parseInt(count));
    if (!products) throw new BadRequestError('products not found!');

    res.status(HTTP_STATUS.OK).json(products);
  }

  private async uploadImages(images: string[]) {
    try {
      return await Promise.all(images.map((image: string) => this.uploadProductImage(image)));
    } catch (error) {
      console.error('Error in uploadImages:', error);
      throw error;
    }
  }

  private async uploadProductImage(productImage: string) {
    try {
      return (await uploads(productImage, 'techShop/productImage')).url;
    } catch (error) {
      throw new BadRequestError('File upload: Error occurred. Try again.');
    }
  }

  private handleCreateError(error: unknown, res: Response): void {
    if (error instanceof MongoError && error.code === 11000) {
      const duplicateKeyInfo = /index: ([\w\d_]+).*dup key: { ([\w\d_]+): "([^"]+)" }/.exec(error.message);
      if (duplicateKeyInfo) {
        const [, indexName, keyName, keyValue] = duplicateKeyInfo;
        const errorMessage = `Duplicate key error in index '${indexName}'. The value '${keyValue}' for key '${keyName}' is already taken.`;
        res.status(HTTP_STATUS.CONFLICT).json({ message: errorMessage });
        return; // Return early to prevent further processing
      }
    }

    console.log(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
}
