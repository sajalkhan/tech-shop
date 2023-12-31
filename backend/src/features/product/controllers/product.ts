import slugify from 'slugify';
import { MongoError } from 'mongodb';
import { config } from '@root/config';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { UploadApiResponse } from 'cloudinary';
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

      const imageUrls = await this.uploadImages(images, title);

      // Add the imageUrls to the productData
      productData.images = imageUrls;

      await productService.createProduct(productData as never);

      res.status(HTTP_STATUS.CREATED).json({ message: 'Product Created successfully', data: productData });
    } catch (error) {
      this.handleCreateError(error, res);
    }
  }

  private async uploadImages(images: string[], title: string): Promise<string[]> {
    try {
      const uploadedImages = await Promise.all(images.map((image: string) => this.uploadProductImage(image, title)));
      return uploadedImages.map(
        (result) => `https://res.cloudinary.com/${config.CLOUD_NAME}/image/upload/v${result.version}/techShop/productImage/${title}`
      );
    } catch (error) {
      console.error('Error in uploadImages:', error);
      throw error;
    }
  }

  private async uploadProductImage(productImage: string, title: string): Promise<UploadApiResponse> {
    try {
      const result = await uploads(productImage, `techShop/productImage/${title}`);
      if (result && 'public_id' in result) {
        return result as UploadApiResponse;
      } else {
        throw new BadRequestError('File upload: Error occurred. Try again.');
      }
    } catch (error) {
      console.error('Error in uploadProductImage:', error);
      throw error;
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
