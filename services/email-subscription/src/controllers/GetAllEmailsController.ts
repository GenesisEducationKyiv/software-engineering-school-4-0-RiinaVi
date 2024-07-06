import { Request, Response } from 'express';

import { CustomResponse } from '../../../../constants/responseMessages';
import EmailSubscriptionService from '../services';

class GetAllEmailsController {
  public async getAllEmails(
    req: Request,
    res: Response,
  ): Promise<Response | undefined> {
    const allEmails = await EmailSubscriptionService.allEmails();

    try {
      res.send(allEmails);
    } catch (error) {
      const typedError = error as CustomResponse;
      console.error(typedError);

      return res
        .status(typedError.code)
        .send({ error: typedError.error?.message });
    }
  }
}

export default GetAllEmailsController;
