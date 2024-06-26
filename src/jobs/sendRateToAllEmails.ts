import EmailSendingService from '../services/EmailSendingService';
import getRateEmailTemplate from '../utils/getRateEmailTemplate';
import { CurrencyExchangeRateService } from '../services/CurrencyExchangeRateService';

const sendRateToAllEmails = async (): Promise<void> => {
  const { rate } = await new CurrencyExchangeRateService().getRate();

  if (rate) {
    const getTemplate = getRateEmailTemplate(rate);
    await EmailSendingService.sendRateToAllEmails(getTemplate);
  }
};

export default sendRateToAllEmails;
