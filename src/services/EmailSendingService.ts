import emailRepository from '../repositories/EmailRepository';
import emailTransporter from '../utils/emailTransporter';
import getEmailOptions from '../utils/getEmailOptions';

export class EmailSendingService {
  static async sendEmail(email: string, currentRate: number) {
    const mailOptions = getEmailOptions(email, currentRate);

    await emailTransporter.sendMail(mailOptions);
  }

  static async sendRateToALlEmail(currentRate: number) {
    const allEmails = await emailRepository.find();

    for (const emailEntry of allEmails) {
      await EmailSendingService.sendEmail(emailEntry.email, currentRate);
    }
  }
}
