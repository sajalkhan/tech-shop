import { IProductDocument } from '@product/interfaces/product.interface';
import { ProductModal } from '@product/models/product.schema';

class ProductService {
  public async createProduct(data: IProductDocument): Promise<void> {
    await ProductModal.create(data);
  }
}

export const productService: ProductService = new ProductService();
