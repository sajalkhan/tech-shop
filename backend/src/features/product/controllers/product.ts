import slugify from 'slugify';
import { MongoError } from 'mongodb';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { uploads } from '@global/helpers/coludinary-upload';
import { authService } from '@service/db/auth.service';
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

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { images, title, description, price, shipping, quantity, color, brand, category, subCategory } = req.body;
      const slug = slugify(title);
      const productData = { images, title, description, price, slug, shipping, quantity, color, brand, category, subCategory };

      const imageUrls = await this.uploadImages(images);

      // Add the imageUrls to the productData
      productData.images = imageUrls;

      const updateProduct = await productService.updateProduct(productData as never, req.params.title);
      if (!updateProduct) throw new BadRequestError('Product not found!');

      res.status(HTTP_STATUS.CREATED).json({ message: 'Product Updated successfully', data: productData });
    } catch (error) {
      this.handleCreateError(error, res);
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleteProduct = await productService.deleteProductById(id);

      if (!deleteProduct) {
        throw new BadRequestError('Product not found!');
      }

      res.status(HTTP_STATUS.OK).json({
        message: 'Product deleted successfully',
        deleteProduct
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: `Internal Server Error ${error}` });
    }
  }

  public async productDetails(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    if (!product) throw new BadRequestError('product not found!');

    res.status(HTTP_STATUS.OK).json(product);
  }

  public async productList(req: Request, res: Response): Promise<void> {
    const { sort, order, pageNumber } = req.body;
    const products = await productService.getProductList(sort, order, pageNumber);
    if (!products) throw new BadRequestError('product not found!');

    res.status(HTTP_STATUS.OK).json(products);
  }

  public async productRating(req: Request, res: Response): Promise<void> {
    try {
      const { star, productId } = req.body;
      const userEmail = req.currentUser!.email;

      const user = await authService.getAuthUserByEmail(userEmail);
      const updatedProduct = await productService.updateProductRating(star, productId, user);

      if (!updatedProduct) {
        throw new BadRequestError('Product Rating update failed!');
      }

      res.status(HTTP_STATUS.OK).json(updatedProduct);
    } catch (error) {
      throw new BadRequestError('Internal Server Error');
    }
  }

  public async productCount(_req: Request, res: Response): Promise<void> {
    const totalProducts = await productService.getTotalProductCount();
    if (!totalProducts) throw new BadRequestError('product not found!');

    res.status(HTTP_STATUS.OK).json(totalProducts);
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
      // Check if productImage already contains "res.cloudinary.com"
      if (productImage.includes('res.cloudinary.com')) {
        // If it does, return the original URL without uploading
        return productImage;
      }

      // If not, proceed with the upload
      const uploadedImage = await uploads(productImage, 'techShop/productImage');
      return uploadedImage.url;
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
