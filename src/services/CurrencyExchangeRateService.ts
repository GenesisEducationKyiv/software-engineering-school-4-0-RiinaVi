import {
  RateSourceResponse,
  RateSourceService,
} from './rateSource/RateSourceService';
import rateSourceInstances from './rateSource';
import responseMessages from '../constants/responseMessages';
import logResponse from '../utils/logResponse';
import { AbstractTransportLayer } from './transportLayer/AbstractTransportLayer';
import fetchTransportLayer from './transportLayer/FetchTransportLayer';

export class CurrencyExchangeRateService {
  protected readonly transportLayer: AbstractTransportLayer;

  constructor(
    private readonly rateSourceService?: RateSourceService,
    transportLayer?: AbstractTransportLayer,
  ) {
    if (transportLayer) {
      this.transportLayer = transportLayer;
    } else {
      this.transportLayer = fetchTransportLayer;
    }
  }

  public async getRate(): Promise<RateSourceResponse> {
    if (this.rateSourceService) {
      return this.rateSourceService.retrieve(this.transportLayer);
    }

    for (const source of rateSourceInstances) {
      try {
        const response = await source.retrieve(this.transportLayer);
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
