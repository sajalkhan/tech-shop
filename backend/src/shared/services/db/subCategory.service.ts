import slugify from 'slugify';
import mongoose from 'mongoose';
import { ISubCategoryDocument } from '@category/interfaces/subCategory.interface';
import { SubCategoryModal } from '@category/models/subCategory.schema';

class subCategoryService {
  public async createSubCategory(data: ISubCategoryDocument): Promise<void> {
    await SubCategoryModal.create(data);
  }

  public async getSubCategoryByName(name: string): Promise<ISubCategoryDocument> {
    const subCategoryName: ISubCategoryDocument = (await SubCategoryModal.findOne({ name }).exec()) as ISubCategoryDocument;
    return subCategoryName;
  }

  public async getSubCategoryBySlug(name: string): Promise<ISubCategoryDocument> {
    const SubcategoryName: ISubCategoryDocument = (await SubCategoryModal.findOne({
      slug: new RegExp(name, 'i')
    }).exec()) as ISubCategoryDocument;
    return SubcategoryName;
  }

  public async updateSubCategory(name: string, slug: string): Promise<ISubCategoryDocument> {
    const subCategoryInfo: ISubCategoryDocument = (await SubCategoryModal.findOneAndUpdate(
      { slug: new RegExp(slug, 'i') },
      { name, slug: slugify(name) },
      { new: true }
    ).exec()) as ISubCategoryDocument;
    return subCategoryInfo;
  }

  public async deleteSubCategoryBySlug(name: string): Promise<ISubCategoryDocument> {
    const subCategory: ISubCategoryDocument = (await SubCategoryModal.findOneAndDelete({
      slug: new RegExp(name, 'i')
    }).exec()) as ISubCategoryDocument;
    return subCategory;
  }

  public async getAllSubCategory(): Promise<ISubCategoryDocument> {
    const subCategoryName: ISubCategoryDocument = (await SubCategoryModal.find({}).sort({ createdAt: -1 }).exec()) as never;
    return subCategoryName;
  }

  public async getAllSubCategoryByParentId(parentId: string): Promise<ISubCategoryDocument[]> {
    let subCategories: ISubCategoryDocument[] = [];

    if (parentId === 'all') {
      subCategories = await SubCategoryModal.find({}).sort({ createdAt: -1 }).lean().exec();
    } else if (mongoose.Types.ObjectId.isValid(parentId)) {
      subCategories = await SubCategoryModal.find({ parent: parentId }).sort({ createdAt: -1 }).lean().exec();
    }

    return subCategories;
  }
}

export const SubCategoryService: subCategoryService = new subCategoryService();