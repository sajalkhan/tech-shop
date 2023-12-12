import { ObjectId } from 'mongodb';
import { model, Model, Schema } from 'mongoose';
import { ISubCategoryDocument } from '@category/interfaces/subCategory.interface';

const subCategorySchema: Schema = new Schema(
  {
    name: { type: String },
    slug: { type: String, unique: true, lowercase: true, index: true },
    parent: { type: ObjectId, ref: 'Category', required: true }
  },
  {
    timestamps: true
  }
);

const SubCategoryModal: Model<ISubCategoryDocument> = model<ISubCategoryDocument>('SubCategory', subCategorySchema, 'SubCategory');
export { SubCategoryModal };
