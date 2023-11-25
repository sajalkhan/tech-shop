import slugify from 'slugify';
import { ICategoryDocument } from '@category/interfaces/category.interface';
import { CategoryModal } from '@category/models/category.schema';

class CategoryService {
  public async createCategory(data: ICategoryDocument): Promise<void> {
    await CategoryModal.create(data);
  }

  public async getCategoryByName(name: string): Promise<ICategoryDocument> {
    const categoryName: ICategoryDocument = (await CategoryModal.findOne({ name }).exec()) as ICategoryDocument;
    return categoryName;
  }

  public async getCategoryBySlug(name: string): Promise<ICategoryDocument> {
    const categoryName: ICategoryDocument = (await CategoryModal.findOne({ slug: new RegExp(name, 'i') }).exec()) as ICategoryDocument;
    return categoryName;
  }

  public async updateCategory(name: string, slug: string): Promise<ICategoryDocument> {
    const categoryInfo: ICategoryDocument = (await CategoryModal.findOneAndUpdate(
      { slug: new RegExp(slug, 'i') },
      { name, slug: slugify(name) },
      { new: true }
    ).exec()) as ICategoryDocument;
    return categoryInfo;
  }

  public async deleteCategoryBySlug(name: string): Promise<ICategoryDocument> {
    const category: ICategoryDocument = (await CategoryModal.findOneAndDelete({
      slug: new RegExp(name, 'i')
    }).exec()) as ICategoryDocument;
    return category;
  }

  public async getAllCategory(): Promise<ICategoryDocument> {
    const categoryName: ICategoryDocument = (await CategoryModal.find({}).sort({ createdAt: -1 }).exec()) as never;
    return categoryName;
  }
}

export const categoryService: CategoryService = new CategoryService();
