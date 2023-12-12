import { Document, Types } from 'mongoose';

export interface ISubCategoryDocument extends Document {
  name: string;
  slug: string;
  parent: Types.ObjectId;
}
