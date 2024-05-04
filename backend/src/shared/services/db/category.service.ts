import slugify from 'slugify';
import { ICategoryDocument } from '@category/interfaces/category.interface';
import { IProductDocument } from '@product/interfaces/product.interface';
import { CategoryModal } from '@category/models/category.schema';
import { ProductModal } from '@product/models/product.schema';

class CategoryService {
  public async createCategory(data: ICategoryDocument): Promise<void> {
    await CategoryModal.create(data);
  }

  public async getCategoryByName(name: string): Promise<ICategoryDocument | null> {
    const categoryName: ICategoryDocument | null = await CategoryModal.findOne({ name }).exec();
    return categoryName;
  }

  public async getCategoryBySlug(name: string): Promise<ICategoryDocument | null> {
    const categoryName: ICategoryDocument | null = await CategoryModal.findOne({ slug: new RegExp(name, 'i') }).exec();
    return categoryName;
  }

  public async updateCategory(name: string, slug: string): Promise<ICategoryDocument | null> {
    const categoryInfo: ICategoryDocument | null = await CategoryModal.findOneAndUpdate(
      { slug: new RegExp(slug, 'i') },
      { name, slug: slugify(name) },
      { new: true }
    ).exec();
    return categoryInfo;
  }

  public async deleteCategoryBySlug(name: string): Promise<ICategoryDocument | null> {
    const category: ICategoryDocument | null = await CategoryModal.findOneAndDelete({
      slug: new RegExp(name, 'i')
    }).exec();
    return category;
  }

  public async getAllCategory(): Promise<ICategoryDocument[]> {
    const categoryName: ICategoryDocument[] = await CategoryModal.find({}).sort({ createdAt: -1 }).exec();
    return categoryName;
  }

  public async getAllProductByCategory(type: string): Promise<{ category: ICategoryDocument | null; products: IProductDocument[] }> {
    const category: ICategoryDocument | null = await CategoryModal.findOne({ slug: { $regex: '^' + type + '$', $options: 'i' } }).exec();
    if (!category) {
      return { category: null, products: [] };
    }

    const products: IProductDocument[] = await ProductModal.find({ category }).populate('category').exec();
    return { category, products };
  }
}

export const categoryService: CategoryService = new CategoryService();
