import JWT from 'jsonwebtoken';
import { config } from '@root/config';
import { Request, Response, NextFunction } from 'express';
import { AuthPayload } from '@auth/interfaces/user.interface';
import { NotAuthorizedError } from '@global/helpers/error-handler';
import { authService } from '@service/db/auth.service';
export class AuthMiddleware {
  public verifyUser(req: Request, _res: Response, next: NextFunction): void {
    if (!req.session?.jwt) {
      throw new NotAuthorizedError('Token is not available. Please login again.');
    }

    try {
      const payload: AuthPayload = JWT.verify(req.session?.jwt, config.JWT_TOKEN!) as AuthPayload;
      req.currentUser = payload;
    } catch (error) {
      throw new NotAuthorizedError('Token is invalid. Please login again.');
    }
    next();
  }

  public checkAuthentication(req: Request, _res: Response, next: NextFunction): void {
    if (!req.currentUser) {
      throw new NotAuthorizedError('Authentication is required to access this route.');
    }
    next();
  }

  public async checkAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!req.currentUser) {
      throw new NotAuthorizedError('Authentication is required to access this route.');
    }

    const { email } = req.currentUser;
    const adminUser = await authService.getAuthUserByEmail(email);
    if (adminUser.role !== 'admin') {
      res.status(403).json({
        err: 'Admin resource. Access denied.'
      });
    } else {
      next();
    }
  }
}

export const authMiddleware: AuthMiddleware = new AuthMiddleware();
