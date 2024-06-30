import EmailSendingService from '../services/EmailSendingService';
import getRateEmailTemplate from '../utils/getRateEmailTemplate';
import { CurrencyExchangeRateService } from '../services/CurrencyExchangeRateService';
import FetchTransportLayer from '../services/transportLayer/FetchTransportLayer';

const sendRateToAllEmails = async (): Promise<void> => {
  const { rate } = await new CurrencyExchangeRateService(
    undefined,
    FetchTransportLayer,
  ).getRate();

  if (rate) {
    const getTemplate = getRateEmailTemplate(rate);
    await EmailSendingService.sendRateToAllEmails(getTemplate);
  }
};

export default sendRateToAllEmails;
