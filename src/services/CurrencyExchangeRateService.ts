import {
  RateSourceResponse,
  RateSourceService,
} from './rateSource/RateSourceService';
import rateSourceInstances from './rateSource';
import responseMessages from '../constants/responseMessages';
import logResponse from '../utils/logResponse';

export class CurrencyExchangeRateService {
  constructor(private readonly rateSourceService?: RateSourceService) {}

  public async getRate(): Promise<RateSourceResponse> {
    if (this.rateSourceService) {
      return this.rateSourceService.retrieve();
    }

    for (const source of rateSourceInstances) {
      try {
        const response = await source.retrieve();
        logResponse({ source: source.getUrl, response });

        if (response.rate) {
          return response;
        }
      } catch (error) {
        console.error(error);
      }
    }

    throw responseMessages.NO_PROVIDER_AVAILABLE;
  }
}
