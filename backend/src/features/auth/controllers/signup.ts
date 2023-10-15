import JWT from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { UploadApiResponse } from 'cloudinary';
import { config } from '@root/config';
import { Helpers } from '@global/helpers/helpers';
import { authService } from '@service/db/auth.service';
import { uploads } from '@global/helpers/coludinary-upload';
import { signupSchema } from '@auth/validation-schema/signup';
import { BadRequestError } from '@global/helpers/error-handler';
import { joiValidation } from '@global/decorators/joi-validation-decorator';
import { IUserDocument, ISignUpData } from '@auth/interfaces/user.interface';

export class SignUp {
  @joiValidation(signupSchema)
  public async create(req: Request, res: Response): Promise<void> {
    const { username, email, password, avatarImage } = req.body;
    const checkIfUserExist: IUserDocument = await authService.getUserByUsernameOrEmail(username, email);
    if (checkIfUserExist) {
      throw new BadRequestError('Invalid credentials');
    }

    const authObjectId: ObjectId = new ObjectId();
    const userObjectId: ObjectId = new ObjectId();
    const uId = `${Helpers.generateRandomIntegers(12)}`;

    const authData: IUserDocument = this.signupData({
      _id: authObjectId,
      uId,
      username,
      email,
      password
    });

    const result: UploadApiResponse = (await uploads(avatarImage, 'techShop/profileImage', `${userObjectId}`)) as UploadApiResponse;
    if (!result?.public_id) {
      throw new BadRequestError('File upload: Error occurred. Try again.');
    }

    // Add to database
    await authService.createAuthUser(authData);

    const userJwt: string = this.signToken(authData, userObjectId);
    req.session = { jwt: userJwt };
    res.status(HTTP_STATUS.CREATED).json({ message: 'User created successfully', authData, token: userJwt });
  }

  private signToken(data: IUserDocument, userObjectId: ObjectId): string {
    return JWT.sign(
      {
        userId: userObjectId,
        uId: data.uId,
        email: data.email,
        username: data.username
      },
      config.JWT_TOKEN!
    );
  }

  private signupData(data: ISignUpData): IUserDocument {
    const { _id, username, email, uId, password } = data;
    return {
      _id,
      uId,
      username: Helpers.firstLetterUppercase(username),
      email: Helpers.lowerCase(email),
      password,
      createdAt: new Date()
    } as unknown as IUserDocument;
  }
}
