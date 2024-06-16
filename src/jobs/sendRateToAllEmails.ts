import nodemailer from 'nodemailer';

import getRateData from '../utils/getRateData';
import getMailTemplate from '../utils/getMailTemplate';
import emailRepository from '../repositories/EmailRepository';

const sendRateToAllEmails = async (): Promise<void> => {
  const currentRate = await getRateData(
    process.env.CURRENCY_BEACON_API_KEY ?? '',
  );
  const allEmails = await emailRepository.find();

  for (const emailEntry of allEmails) {
    const unsubscribeURL = `http://${process.env.SERVER_IP ?? 'localhost'}:${
      process.env.PORT ?? 8000
    }/unsubscribe?email=${emailEntry.email}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_EMAIL_ADDRESS,
        pass: process.env.SENDER_EMAIL_PASSWORD,
      },
    });

    if (currentRate) {
      const mailOptions = {
        from: process.env.SENDER_EMAIL_ADDRESS,
        to: emailEntry.email,
        subject: 'Current USD to UAH exchange rate',
        html: getMailTemplate(currentRate, unsubscribeURL),
      };

      const sentMessageInfo = await transporter.sendMail(mailOptions);

      console.log('E-mail Sent: %s', sentMessageInfo.messageId);
    }
  }
};

export default sendRateToAllEmails;
