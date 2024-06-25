import { RateSourceResponse, RateSourceService } from './RateSourceService';
import responseMessages from '../../constants/responseMessages';

type NBUResponse = {
  rate: number;
  cc: 'USD';
  exchangedate: string;
}[];

const { INTERNAL_SERVER_ERROR } = responseMessages;

class NBUService extends RateSourceService {
  constructor() {
    super(
      'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json',
    );
  }

  async retrieve(): Promise<RateSourceResponse> {
    const rawResponse = await fetch(this.url);

    const [USDRate] = (await rawResponse?.json()) as NBUResponse;

    if (USDRate) {
      return {
        rate: USDRate.rate,
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

export default new NBUService();
