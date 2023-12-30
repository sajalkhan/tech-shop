import { ObjectId } from 'mongodb';
import { model, Model, Schema } from 'mongoose';
import { IProductDocument } from '@product/interfaces/product.interface';

const productSchema: Schema = new Schema(
  {
    title: { type: String, trim: true, text: true },
    slug: { type: String, unique: true, lowercase: true, index: true },
    description: { type: String },
    price: { type: Number },
    category: {
      type: ObjectId,
      ref: 'Category'
    },
    subCategory: [
      {
        type: ObjectId,
        ref: 'SubCategory'
      }
    ],
    quantity: { type: Number },
    sold: { type: Number, default: 0 },
    images: { type: Array<string> },
    shipping: {
      type: String,
      enum: ['Yes', 'No']
    },
    color: {
      type: String,
      enum: ['Black', 'Brown', 'Silver', 'White', 'Blue']
    },
    brand: {
      type: String,
      enum: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS']
    },
    ratings: [
      {
        star: Number,
        postedBy: {
          type: ObjectId,
          ref: 'user'
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const ProductModal: Model<IProductDocument> = model<IProductDocument>('Product', productSchema, 'Product');
export { ProductModal };
