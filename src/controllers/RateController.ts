import { Request, Response } from 'express';

import responseMessages from '../constants/responseMessages';
import { RateSourceService } from '../services/rateSource/RateSourceService';

const { INVALID_STATUS_VALUE } = responseMessages;

class RateController {
  constructor(private readonly rateSourceService: RateSourceService) {}

  public async getRate(
    _: Request,
    res: Response,
  ): Promise<Response | undefined> {
    const rate = await this.rateSourceService.retrieve();

    if (!rate) {
      return res
        .sendStatus(INVALID_STATUS_VALUE.code)
        .send({ error: INVALID_STATUS_VALUE.error });
    }

    res.send({ rate });
  }
}

export default RateController;
