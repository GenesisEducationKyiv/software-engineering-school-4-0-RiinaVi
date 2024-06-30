import { RateSourceResponse, RateSourceService } from './RateSourceService';
import { AbstractTransportLayer } from '../transportLayer/AbstractTransportLayer';

export interface CurrencyBeaconResponse {
  meta: {
    code: 200 | 401 | 422 | 500 | 503 | 429;
    error_type?: string;
    error_detail?: string;
  };
  rates?: {
    UAH: number;
  };
}

export class CurrencyBeaconService extends RateSourceService {
  constructor(apiKey: string, transportLayer: AbstractTransportLayer) {
    super(
      `https://api.currencybeacon.com/v1/latest?api_key=${apiKey}&symbols=UAH`,
      transportLayer,
    );
  }

  async retrieve(): Promise<RateSourceResponse> {
    const { rates, meta } =
      await this.transportLayer.get<CurrencyBeaconResponse>(this.url);

    return {
      rate: rates?.UAH,
      code: meta.code,
      errorMessage:
        meta?.error_type && meta?.error_detail
          ? `${meta.error_type}: ${meta.error_detail}`
          : undefined,
    };
  }
}
