import { IProductDocument } from '@product/interfaces/product.interface';
import { ProductModal } from '@product/models/product.schema';

class ProductService {
  public async createProduct(data: IProductDocument): Promise<void> {
    await ProductModal.create(data);
  }

  public async getProductsByCount(count: number): Promise<IProductDocument[]> {
    const productList: IProductDocument[] = await ProductModal.find({})
      .limit(count)
      .populate('category')
      .populate('subCategory')
      .sort([['createdAt', 'desc']])
      .exec();

    return productList;
  }
}

export const productService: ProductService = new ProductService();
