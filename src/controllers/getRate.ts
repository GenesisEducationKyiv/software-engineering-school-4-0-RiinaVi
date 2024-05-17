import { Request, Response } from 'express';

import getRateData from '../utils/getRateData';

const getRate = async (_: Request, res: Response) => {

  const rate = await getRateData();

  if (!rate) {
    return res.sendStatus(400).send({ error: { message: 'Invalid status value' } });
  }

  res.send({ rate });
};

export default getRate;
