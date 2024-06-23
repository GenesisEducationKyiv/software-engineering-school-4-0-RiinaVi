import { RateSourceResponse, RateSourceService } from './RateSourceService';
import responseMessages from '../../constants/responseMessages';
import process from 'process';

interface CurrencyAPIResponse {
  meta: {
    last_updated_at: string;
  };
  data: {
    UAH: {
      code: string;
      value: number;
    };
  };
}

const { SOMETHING_WENT_WRONG } = responseMessages;

class CurrencyAPIService extends RateSourceService {
  constructor(apiKey: string) {
    super(
      `https://api.currencyapi.com/v3/latest?currencies=UAH&apikey=${apiKey}`,
    );
  }

  async retrieve(): Promise<RateSourceResponse> {
    const rawResponse = await fetch(this.url);

    const { data } = (await rawResponse?.json()) as CurrencyAPIResponse;

    if (data) {
      return {
        rate: data.UAH.value,
        code: 200,
      };
    } else {
      return {
        code: SOMETHING_WENT_WRONG.code,
        errorMessage: SOMETHING_WENT_WRONG.error?.message,
      };
    }
  }
}

export default new CurrencyAPIService(process.env.CURRENCY_API_API_KEY ?? '');
