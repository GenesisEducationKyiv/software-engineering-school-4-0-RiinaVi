import emailRepository from '../repositories/EmailRepository';
import emailTransporter from '../utils/emailTransporter';
import getEmailOptions from '../utils/getEmailOptions';

export class EmailSendingService {
  static async sendEmail(email: string, currentRate: number): Promise<void> {
    const mailOptions = getEmailOptions(email, currentRate);

    await emailTransporter.sendMail(mailOptions);
  }

  static async sendRateToALlEmail(currentRate: number): Promise<void> {
    const allEmails = await emailRepository.find();

    for (const emailEntry of allEmails) {
      await EmailSendingService.sendEmail(emailEntry.email, currentRate);
    }
  }
}
