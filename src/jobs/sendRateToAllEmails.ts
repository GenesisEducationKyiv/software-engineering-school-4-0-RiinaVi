import EmailSendingService from '../services/EmailSendingService';
import { CurrencyBeaconService } from '../services/rateSource/CurrencyBeaconService';
import getRateEmailTemplate from '../utils/getRateEmailTemplate';
import FetchTransportLayer from '../services/transportLayer/FetchTransportLayer';

const sendRateToAllEmails = async (): Promise<void> => {
  const currentRateSource = new CurrencyBeaconService(
    process.env.RATE_SOURCE_API_KEY ?? '',
    FetchTransportLayer,
  );
  const currentRate = await currentRateSource.retrieve();

  if (currentRate) {
    const getTemplate = getRateEmailTemplate(currentRate);
    await EmailSendingService.sendRateToAllEmails(getTemplate);
  }
};

export default sendRateToAllEmails;
