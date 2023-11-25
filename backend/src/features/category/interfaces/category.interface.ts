import { Document } from 'mongoose';

export interface ICategoryDocument extends Document {
  name: string;
  slug: string;
}
