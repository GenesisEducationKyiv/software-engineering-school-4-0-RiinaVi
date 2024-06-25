import { RateSourceResponse, RateSourceService } from './RateSourceService';
import responseMessages from '../../constants/responseMessages';

const USD_CODE = 840;

type MonobankResponse = {
  currencyCodeA: number;
  currencyCodeB: number;
  date: number;
  rateBuy: number;
  rateSell: number;
}[];

const { INTERNAL_SERVER_ERROR } = responseMessages;

class MonobankService extends RateSourceService {
  constructor() {
    super('https://api.monobank.ua/bank/currency');
  }

  async retrieve(): Promise<RateSourceResponse> {
    const rawResponse = await fetch(this.url);

    const jsonResponse = (await rawResponse?.json()) as MonobankResponse;

    const USDRate = jsonResponse.find(
      (entry) => entry.currencyCodeA === USD_CODE,
    );

    if (USDRate) {
      return {
        rate: USDRate.rateBuy,
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

export default new MonobankService();
