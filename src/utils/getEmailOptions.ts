import getMailTemplate from './getMailTemplate';
import getUnsubscribeURL from './getUnsubscribeURL';

const getEmailOptions = (email: string, currentRate: number) => ({
  from: process.env.SENDER_EMAIL_ADDRESS,
  to: email,
  subject: 'Current USD to UAH exchange rate',
  html: getMailTemplate(currentRate, getUnsubscribeURL(email)),
});

export default getEmailOptions;
