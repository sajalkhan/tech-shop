import { SortOrder } from 'mongoose';
import { IProductDocument } from '@product/interfaces/product.interface';
import { ProductModal } from '@product/models/product.schema';

class ProductService {
  public async createProduct(data: IProductDocument): Promise<void> {
    await ProductModal.create(data);
  }

  public async getTotalProductCount(): Promise<number> {
    const totalProductCount = await ProductModal.estimatedDocumentCount().exec();
    return totalProductCount;
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
    })
      .populate('category')
      .populate('subCategory')
      .exec()) as IProductDocument;
    return product;
  }

  public async getProductList(sort: string, order: SortOrder, pageNumber: number) {
    const currentPage = pageNumber || 1;
    const perPage = 3; // 3

    const products = await ProductModal.find({})
      .skip((currentPage - 1) * perPage) // Skips the appropriate number of documents based on the current page and items per page to implement pagination.
      .populate('category')
      .populate('subCategory')
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    return products;
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
