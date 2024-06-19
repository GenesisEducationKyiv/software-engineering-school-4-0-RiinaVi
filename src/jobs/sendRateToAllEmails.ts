import { EmailSendingService } from '../services/EmailSendingService';
import { CurrencyBeaconService } from '../services/RateSourceService';
import getRateEmailTemplate from '../utils/getRateEmailTemplate';

const sendRateToAllEmails = async (): Promise<void> => {
  const currentRateSource = new CurrencyBeaconService(
    process.env.CURRENCY_BEACON_API_KEY ?? '',
  );
  const { rate } = await currentRateSource.retrieve();

  if (rate) {
    const getTemplate = getRateEmailTemplate(rate);
    await EmailSendingService.sendRateToALlEmails(getTemplate);
  }
};

export default sendRateToAllEmails;
