import { RateSourceResponse, RateSourceService } from './RateSourceService';
import responseMessages from '../../constants/responseMessages';

type NBUResponse = {
  rate: number;
  cc: 'USD';
  exchangedate: string;
}[];

const { SOMETHING_WENT_WRONG } = responseMessages;

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
        code: SOMETHING_WENT_WRONG.code,
        errorMessage: SOMETHING_WENT_WRONG.error?.message,
      };
    }
  }
}

export default new NBUService();
