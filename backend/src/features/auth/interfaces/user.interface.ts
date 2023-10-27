import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

declare global {
  namespace Express {
    interface Request {
      currentUser?: AuthPayload;
    }
  }
}

export interface AuthPayload {
  uId: string;
  email: string;
  userId: string;
  username: string;
}

export interface IUserDocument extends Document {
  _id: string | ObjectId;
  uId: string;
  role?: string;
  cart?: string[];
  email: string;
  username: string;
  password?: string;
  createdAt: Date;
  passwordResetToken?: string;
  passwordResetExpires?: number | string;
  comparePassword(password: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}

export interface ISignUpData {
  _id: ObjectId;
  uId: string;
  email: string;
  username: string;
  password: string;
}
