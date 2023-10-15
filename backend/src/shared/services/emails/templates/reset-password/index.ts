/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import { load } from 'cheerio';

class ResetPasswordTemplate {
  public passwordResetConfirmationTemplate(templateParams: any): string {
    const { username, email, ipaddress, date } = templateParams;
    // Load index.html and parse it using Cheerio
    const html = fs.readFileSync(__dirname + '/index.html', 'utf8');
    const $ = load(html);

    // Update necessary field value
    $('.reset-password__userName').text(username);
    $('.reset-password__email').text(email);
    $('.reset-password__ip').text(ipaddress);
    $('.reset-password__date').text(date);

    // Return the updated HTML content as a string
    return $.html();
  }
}

export const resetPasswordTemplate: ResetPasswordTemplate = new ResetPasswordTemplate();
