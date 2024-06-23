import { RateSourceResponse, RateSourceService } from './RateSourceService';
import responseMessages from '../../constants/responseMessages';

type PrivatBankResponse = {
  ccy: 'EUR' | 'USD';
  base_ccy: 'UAH';
  buy: number;
  sale: number;
}[];

const { SOMETHING_WENT_WRONG } = responseMessages;

class PrivatBankService extends RateSourceService {
  constructor() {
    super('https://api.privatbank.ua/p24api/pubinfo');
  }

  async retrieve(): Promise<RateSourceResponse> {
    const rawResponse = await fetch(this.url);

    const [, USDRate] = (await rawResponse?.json()) as PrivatBankResponse;

    if (USDRate) {
      return {
        rate: USDRate.buy,
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

export default new PrivatBankService();
