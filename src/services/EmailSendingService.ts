import emailRepository from '../repositories/EmailRepository';
import emailTransporter from '../utils/emailTransporter';
import getUnsubscribeURL from '../utils/getUnsubscribeURL';

const EMAIL_SUBJECT = 'Current USD to UAH exchange rate';

export class EmailSendingService {
  static async sendEmail(email: string, emailTemplate: string): Promise<void> {
    await emailTransporter.sendMail({
      from: email,
      to: process.env.SENDER_EMAIL_ADDRESS,
      subject: EMAIL_SUBJECT,
      html: emailTemplate,
    });
  }

  static async sendRateToALlEmails(
    getTemplate: (url: string) => string,
  ): Promise<void> {
    const allEmails = await emailRepository.find();

    for (const { email } of allEmails) {
      await EmailSendingService.sendEmail(
        email,
        getTemplate(
          getUnsubscribeURL(
            email,
            process.env.SERVER_IP,
            Number(process.env.PORT),
          ),
        ),
      );
    }
  }
}
