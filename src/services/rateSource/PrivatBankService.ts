import { RateSourceResponse, RateSourceService } from './RateSourceService';
import responseMessages from '../../constants/responseMessages';

type PrivatBankResponse = {
  ccy: 'EUR' | 'USD';
  base_ccy: 'UAH';
  buy: number;
  sale: number;
}[];

const { INTERNAL_SERVER_ERROR } = responseMessages;

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
        code: INTERNAL_SERVER_ERROR.code,
        errorMessage: INTERNAL_SERVER_ERROR.error?.message,
      };
    }
  }
}

export default new PrivatBankService();
