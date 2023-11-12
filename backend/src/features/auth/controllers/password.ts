import moment from 'moment';
import publicIP from 'ip';
import crypto from 'crypto';
import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from 'express';

import { config } from '@root/config';
import { authService } from '@service/db/auth.service';
import { mailTransport } from '@service/emails/mail.transport';
import { BadRequestError } from '@global/helpers/error-handler';
import { IUserDocument } from '@auth/interfaces/user.interface';
import { joiValidation } from '@global/decorators/joi-validation-decorator';
import { forgotPasswordTemplate } from '@service/emails/templates/forgot-password';
import { resetPasswordTemplate } from '@service/emails/templates/reset-password';
import { emailSchema, passwordSchema, updatePasswordSchema } from '@auth/validation-schema/password';

export class Password {
  @joiValidation(emailSchema)
  public async create(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    const existingUser: IUserDocument = await authService.getAuthUserByEmail(email);
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
    const randomCharacters: string = randomBytes.toString('hex');
    await authService.updatePasswordToken(`${existingUser._id!}`, randomCharacters, Date.now() * 60 * 60 * 1000);

    const resetLink = `${config.CLIENT_URL}/reset-password?token=${randomCharacters}`;
    const template: string = forgotPasswordTemplate.passwordResetTemplate(existingUser.username!, resetLink);
    await mailTransport.sendEmail(email, 'Reset your password', template);
    res.status(HTTP_STATUS.OK).json({ message: 'Password reset email sent.' });
  }

  @joiValidation(passwordSchema)
  public async reset(req: Request, res: Response): Promise<void> {
    const { password, confirmPassword } = req.body;
    const { token } = req.params;
    if (password !== confirmPassword) {
      throw new BadRequestError('Passwords do not match');
    }
    const existingUser: IUserDocument = await authService.getAuthUserByPasswordToken(token);
    if (!existingUser) {
      throw new BadRequestError('Reset token has expired.');
    }

    existingUser.password = password;
    existingUser.passwordResetExpires = undefined;
    existingUser.passwordResetToken = undefined;
    await existingUser.save();

    const templateParams = {
      username: existingUser.username!,
      email: existingUser.email!,
      ipaddress: publicIP.address(),
      date: moment().format('DD//MM//YYYY HH:mm')
    };

    const template: string = resetPasswordTemplate.passwordResetConfirmationTemplate(templateParams);
    await mailTransport.sendEmail(existingUser.email, 'Password Reset Confirmation', template);

    res.status(HTTP_STATUS.OK).json({ message: 'Password successfully updated.' });
  }

  @joiValidation(updatePasswordSchema)
  public async updatePassword(req: Request, res: Response): Promise<void> {
    const { email, password, confirmPassword } = req.body;

    const existingUser: IUserDocument = await authService.getAuthUserByEmail(email);
    if (!existingUser) throw new BadRequestError('Invalid credentials');
    if (password === confirmPassword) throw new BadRequestError('Password must be different!');

    const passwordsMatch: boolean = await existingUser.comparePassword(password);
    if (!passwordsMatch) throw new BadRequestError('Password Does not match.');

    existingUser.password = confirmPassword;
    await existingUser.save();

    res.status(HTTP_STATUS.OK).json({ message: 'Password successfully updated.' });
  }
}
