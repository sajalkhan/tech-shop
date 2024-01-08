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

  public async getProductById(id: string): Promise<IProductDocument> {
    const product: IProductDocument = (await ProductModal.findOne({
      _id: id
    }).exec()) as IProductDocument;
    return product;
  }

  public async deleteProductById(id: string): Promise<IProductDocument> {
    const product: IProductDocument = (await ProductModal.findOneAndDelete({
      _id: id
    }).exec()) as IProductDocument;
    return product;
  }

  public async updateProduct(data: IProductDocument, title: string): Promise<IProductDocument> {
    const product: IProductDocument = (await ProductModal.findOneAndUpdate({ title: title }, data, {
      new: true
    }).exec()) as IProductDocument;
    return product;
  }
}

export const productService: ProductService = new ProductService();
