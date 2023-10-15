import { IUserDocument } from '@auth/interfaces/user.interface';
import { UserModal } from '@auth/models/user.schema';
import { Helpers } from '@global/helpers/helpers';

class AuthService {
  public async createAuthUser(data: IUserDocument): Promise<void> {
    await UserModal.create(data);
  }

  public async getUserById(id: string): Promise<IUserDocument> {
    const user: IUserDocument = (await UserModal.findById(id).exec()) as IUserDocument;
    return user;
  }

  public async getAuthUserByEmail(email: string): Promise<IUserDocument> {
    const user: IUserDocument = (await UserModal.findOne({ email: Helpers.lowerCase(email) }).exec()) as IUserDocument;
    return user;
  }

  public async getUserByUsernameOrEmail(username: string, email: string): Promise<IUserDocument> {
    const query = {
      $or: [{ username: Helpers.firstLetterUppercase(username) }, { email: Helpers.lowerCase(email) }]
    };
    const user: IUserDocument = (await UserModal.findOne(query).exec()) as IUserDocument;
    return user;
  }

  public async getAuthUserByUsername(username: string): Promise<IUserDocument> {
    const user: IUserDocument = (await UserModal.findOne({ username: Helpers.firstLetterUppercase(username) }).exec()) as IUserDocument;
    return user;
  }

  public async getAuthUserByPasswordToken(token: string): Promise<IUserDocument> {
    const user: IUserDocument = (await UserModal.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    }).exec()) as IUserDocument;
    return user;
  }

  public async updatePasswordToken(authId: string, token: string, tokenExpiration: number): Promise<void> {
    await UserModal.updateOne(
      { _id: authId },
      {
        passwordResetToken: token,
        passwordResetExpires: tokenExpiration
      }
    );
  }
}

export const authService: AuthService = new AuthService();
