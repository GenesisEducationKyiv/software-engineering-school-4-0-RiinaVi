import { EmailSendingService } from '../services/EmailSendingService';
import { CurrencyBeaconService } from '../services/RateSourceService';

const sendRateToAllEmails = async (): Promise<void> => {
  const currentRateSource = new CurrencyBeaconService(
    process.env.CURRENCY_BEACON_API_KEY,
  );
  const currentRate = await currentRateSource.retrieve();

  await EmailSendingService.sendRateToALlEmail(currentRate);
};

export default sendRateToAllEmails;
