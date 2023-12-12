import { model, Model, Schema } from 'mongoose';
import { ICategoryDocument } from '@category/interfaces/category.interface';

const categorySchema: Schema = new Schema(
  {
    name: { type: String },
    slug: { type: String, unique: true, lowercase: true }
  },
  {
    timestamps: true
  }
);

const CategoryModal: Model<ICategoryDocument> = model<ICategoryDocument>('Category', categorySchema, 'Category');
export { CategoryModal };
