import { RateSourceResponse, RateSourceService } from './RateSourceService';
import * as process from 'process';

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

class CurrencyBeaconService extends RateSourceService {
  constructor(apiKey: string) {
    super(
      `https://api.currencybeacon.com/v1/latest?api_key=${apiKey}&symbols=UAH`,
    );
  }

  async retrieve(): Promise<RateSourceResponse> {
    const rawResponse = await fetch(this.url);

    const { rates, meta } =
      (await rawResponse?.json()) as CurrencyBeaconResponse;

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

export default new CurrencyBeaconService(
  process.env.CURRENCY_BEACON_API_KEY ?? '',
);
