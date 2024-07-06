import emailTransporter from '../utils/emailTransporter';
import getUnsubscribeURL from '../utils/getUnsubscribeURL';

const EMAIL_SUBJECT = 'Current USD to UAH exchange rate';

class EmailSendingService {
  async sendEmail(email: string, emailTemplate: string): Promise<void> {
    await emailTransporter.sendMail({
      from: process.env.SENDER_EMAIL_ADDRESS,
      to: email,
      subject: EMAIL_SUBJECT,
      html: emailTemplate,
    });
  }

  async sendRateToAllEmails(
    getTemplate: (url: string) => string,
    allEmails: { email: string }[],
  ): Promise<void> {
    for (const { email } of allEmails) {
      await this.sendEmail(
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

export default new EmailSendingService();
