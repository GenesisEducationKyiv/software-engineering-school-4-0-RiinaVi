import { RateSourceService } from './RateSourceService';
import { AbstractTransportLayer } from '../transportLayer/AbstractTransportLayer';

interface CurrencyBeaconResponse {
  response: {
    rates?: {
      UAH: number;
    };
  };
}

export class CurrencyBeaconService extends RateSourceService {
  constructor(apiKey: string, transportLayer: AbstractTransportLayer) {
    super(
      `https://api.currencybeacon.com/v1/latest?api_key=${apiKey}&symbols=UAH`,
      transportLayer,
    );
  }

  async retrieve(): Promise<number | undefined> {
    const jsonResponse = await this.transportLayer.get<CurrencyBeaconResponse>(
      this.url,
    );

    return jsonResponse.response?.rates?.UAH;
  }
}
