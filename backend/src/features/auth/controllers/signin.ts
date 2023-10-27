import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { config } from '@root/config';
import HTTP_STATUS from 'http-status-codes';
import { authService } from '@service/db/auth.service';
import { loginSchema } from '@auth/validation-schema/signin';
import { IUserDocument } from '@auth/interfaces/user.interface';
import { BadRequestError } from '@global/helpers/error-handler';
import { joiValidation } from '@global/decorators/joi-validation-decorator';

export class SignIn {
  @joiValidation(loginSchema)
  public async read(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const existingUser: IUserDocument = await authService.getAuthUserByUsername(username);
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch: boolean = await existingUser.comparePassword(password);
    if (!passwordsMatch) {
      throw new BadRequestError('Password Does not match.');
    }

    const user: IUserDocument = await authService.getUserById(`${existingUser._id}`);
    if (!user) {
      throw new BadRequestError('User Not Found');
    }

    const userJwt: string = JWT.sign(
      {
        userId: user._id,
        uId: existingUser.uId,
        email: existingUser.email,
        username: existingUser.username
      },
      config.JWT_TOKEN!
    );

    req.session = { jwt: userJwt };
    const userDocument: IUserDocument = {
      ...user,
      username: existingUser!.username,
      email: existingUser!.email,
      uId: existingUser!.uId,
      createdAt: existingUser!.createdAt
    } as IUserDocument;

    res.status(HTTP_STATUS.OK).json({ message: 'User login successfully', user: userDocument, token: userJwt });
  }
}
