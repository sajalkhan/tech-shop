import { SortOrder } from 'mongoose';
import { ProductModal } from '@product/models/product.schema';
import { IUserDocument } from '@auth/interfaces/user.interface';
import { IProductDocument } from '@product/interfaces/product.interface';

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

  public async getRelatedProduct(id: string) {
    try {
      const product: IProductDocument | null = await ProductModal.findById(id).exec();
      if (!product) return null;

      const relatedProduct = await ProductModal.find({
        _id: { $ne: product._id },
        category: product.category
      })
        .limit(3)
        .populate('category subCategory')
        .populate({
          path: 'ratings.postedBy',
          model: 'user'
        })
        .exec();

      return relatedProduct;
    } catch (error) {
      return null;
    }
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

  public async updateProductRating(star: number, productId: string, user: IUserDocument) {
    try {
      const product: IProductDocument | null = await ProductModal.findById(productId);
      if (!product) return null;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const existingRatingObject: any = product.ratings.find((ele: any) => ele.postedBy.toString() === user._id.toString());

      if (!existingRatingObject) {
        // If user hasn't left a rating yet, push it
        product.ratings.push({ star, postedBy: user._id });
      } else {
        // If the user has already left a rating, update it
        existingRatingObject.star = star;
      }

      const updatedProduct = await product.save();
      return updatedProduct;
    } catch (error) {
      // Handle errors appropriately
      console.error('Error updating product rating:', error);
      throw error;
    }
  }
}

export const productService: ProductService = new ProductService();
