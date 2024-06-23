import { Request, Response } from 'express';

import { RateSourceService } from '../services/rateSource/RateSourceService';
import { CurrencyExchangeRateService } from '../services/CurrencyExchangeRateService';

class RateController {
  constructor(private readonly rateSourceService?: RateSourceService) {}

  public async getRate(
    _: Request,
    res: Response,
  ): Promise<Response | undefined> {
    const { rate, code, errorMessage } = await new CurrencyExchangeRateService(
      this.rateSourceService,
    ).getRate();

    if (!rate) {
      return res.status(code).send({ error: errorMessage });
    }

    return res.send({ rate });
  }
}

export default RateController;
