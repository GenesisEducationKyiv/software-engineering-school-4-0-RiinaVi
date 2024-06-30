import { Request, Response } from 'express';

import { RateSourceService } from '../services/rateSource/RateSourceService';
import { CurrencyExchangeRateService } from '../services/CurrencyExchangeRateService';

class RateController {
  private currencyExchangeRateService: CurrencyExchangeRateService;
  constructor(private readonly rateSourceService?: RateSourceService) {
    this.currencyExchangeRateService = new CurrencyExchangeRateService(
      rateSourceService,
    );
  }

  public async getRate(
    _: Request,
    res: Response,
  ): Promise<Response | undefined> {
    const { rate, code, errorMessage } =
      await this.currencyExchangeRateService.getRate();

    if (!rate) {
      return res.status(code).send({ error: errorMessage });
    }

    return res.send({ rate });
  }
}

export default RateController;
