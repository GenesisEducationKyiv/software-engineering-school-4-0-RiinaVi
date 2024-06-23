import EmailSendingService from '../services/EmailSendingService';
import currencyBeaconService from '../services/rateSource/CurrencyBeaconService';
import getRateEmailTemplate from '../utils/getRateEmailTemplate';

const sendRateToAllEmails = async (): Promise<void> => {
  const { rate } = await currencyBeaconService.retrieve();

  if (rate) {
    const getTemplate = getRateEmailTemplate(rate);
    await EmailSendingService.sendRateToAllEmails(getTemplate);
  }
};

export default sendRateToAllEmails;
