import { hash, compare } from 'bcryptjs';
import { model, Model, Schema } from 'mongoose';
import { IUserDocument } from '@auth/interfaces/user.interface';

const SALT_ROUND = 10;

const userSchema: Schema = new Schema(
  {
    username: { type: String },
    uId: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, default: 'subscriber' },
    cart: { type: Array<string>, default: [] },
    avatarImage: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    passwordResetToken: { type: String, default: '' },
    passwordResetExpires: { type: Date }
  },
  {
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
        return ret;
      }
    }
  }
);

// Middleware to hash the password before saving
userSchema.pre('save', async function (this: IUserDocument, next) {
  try {
    const hashedPassword: string = await hash(this.password as string, SALT_ROUND);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  const hashedPassword: string = (this as unknown as IUserDocument).password!;
  return await compare(password, hashedPassword);
};

userSchema.methods.hashPassword = async function (password: string): Promise<string> {
  return hash(password, SALT_ROUND);
};

const UserModal: Model<IUserDocument> = model<IUserDocument>('user', userSchema, 'user');
export { UserModal };
