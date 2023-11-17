import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { authService } from '@service/db/auth.service';
import { IUserDocument } from '@auth/interfaces/user.interface';
import { NotAuthorizedError } from '@global/helpers/error-handler';

export class CurrentUser {
  public async currentUserInfo(req: Request, res: Response): Promise<void> {
    let isUser = false;
    let token = null;
    let user = null;

    const existingUser: IUserDocument = await authService.getUserById(`${req.currentUser!.userId}`);

    if (Object.keys(existingUser).length) {
      isUser = true;
      token = req.session?.jwt;
      user = existingUser;
    }
    res.status(HTTP_STATUS.OK).json({ token, isUser, user });
  }

  public async currentAdminInfo(req: Request, res: Response): Promise<void> {
    let isUser = false;
    let token = null;
    let user = null;

    const existingUser: IUserDocument = await authService.getUserById(`${req.currentUser!.userId}`);

    if (existingUser.role !== 'admin') {
      throw new NotAuthorizedError('Authentication is required to access this route.');
    }
    if (Object.keys(existingUser).length) {
      isUser = true;
      token = req.session?.jwt;
      user = existingUser;
    }
    res.status(HTTP_STATUS.OK).json({ token, isUser, user });
  }
}
