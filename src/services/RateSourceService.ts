interface CurrencyBeaconResponse {
  response: {
    rates?: {
      UAH: number;
    };
  };
}

export abstract class RateSourceService {
  protected constructor(protected readonly url: string) {}

  abstract retrieve(): Promise<number | undefined>;
}

export class CurrencyBeaconService extends RateSourceService {
  constructor(apiKey: string) {
    super(
      `https://api.currencybeacon.com/v1/latest?api_key=${apiKey}&symbols=UAH`,
    );
  }

  async retrieve(): Promise<number | undefined> {
    const rawResponse = await fetch(this.url);

    const jsonResponse = (await rawResponse.json()) as CurrencyBeaconResponse;

    return jsonResponse.response?.rates?.UAH;
  }
}
