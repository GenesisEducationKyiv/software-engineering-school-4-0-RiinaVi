import { Request, Response } from 'express';

import getRateData from '../utils/getRateData';

const getRate = async (_: Request, res: Response): Promise<Response> => {
  const rate = await getRateData(process.env.CURRENCY_BEACON_API_KEY);

  if (!rate) {
    return res
      .sendStatus(400)
      .send({ error: { message: 'Invalid status value' } });
  }

  res.send({ rate });
};

export default getRate;
