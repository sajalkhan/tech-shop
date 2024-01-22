import { Document, Types } from 'mongoose';

export interface IProductDocument extends Document {
  title: string;
  slug: string;
  description: string;
  price: number;
  category: Types.ObjectId;
  subCategory: [Types.ObjectId];
  quantity: number;
  sold: number;
  images: string[];
  shipping: string;
  color: string;
  brand: string;
  ratings: Array<{
    star: number;
    postedBy: string | Types.ObjectId;
  }>;
}
