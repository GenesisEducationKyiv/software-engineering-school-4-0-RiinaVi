import { Request, Response } from 'express';

import { CustomResponse } from '../constants/responseMessages';
import EmailSubscriptionService from '../services/EmailSubscriptionService';

class SubscribeController {
  public async subscribe(
    req: Request,
    res: Response,
  ): Promise<Response | undefined> {
    const { email: requestEmail } = req.body as { email: string };

    const emailSubscription = new EmailSubscriptionService(requestEmail);

    try {
      await emailSubscription.subscribe();

      res.send(emailSubscription.email);
    } catch (error) {
      const typedError = error as CustomResponse;
      console.error(typedError);

      return res
        .status(typedError.code)
        .send({ error: typedError.error?.message });
    }
  }
}

export default SubscribeController;
