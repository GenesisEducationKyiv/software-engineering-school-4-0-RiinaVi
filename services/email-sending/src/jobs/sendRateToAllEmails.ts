import EmailSendingService from '../services';
import getRateEmailTemplate from '../utils/getRateEmailTemplate';
import getRate from '../utils/getRateFromCurrencyExchangeRateService';
import getAllEmails from '../utils/getAllEmailsFromEmailSubscriptionService';

const sendRateToAllEmails = async (): Promise<void> => {
  const rate = await getRate();
  const emails = await getAllEmails();

  if (rate && emails) {
    const getTemplate = getRateEmailTemplate(rate);
    await EmailSendingService.sendRateToAllEmails(getTemplate, emails);
  }
};

export default sendRateToAllEmails;
