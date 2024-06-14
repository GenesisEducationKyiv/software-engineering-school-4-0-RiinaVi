import { Request, Response } from 'express';

import responseMessages from '../constants/responseMessages';
import EmailSubscriptionService from '../services/EmailSubscriptionService';

const { EMAIL_ALREADY_EXISTS, INVALID_PAYLOAD } = responseMessages;

class SubscribeController {
  public async subscribe(req: Request, res: Response): Promise<Response> {
    const { email: requestEmail } = req.body as { email: string };

    const emailSubscription = new EmailSubscriptionService(requestEmail);

    try {
      const validationError = emailSubscription.validate();
      if (validationError) {
        return res.status(INVALID_PAYLOAD.code).send({
          validationError,
        });
      }
      const alreadyExists = await emailSubscription.isExists();

      if (alreadyExists) {
        res.status(EMAIL_ALREADY_EXISTS.code).send({
          error: EMAIL_ALREADY_EXISTS.error,
        });
      } else {
        await emailSubscription.subscribe();

        res.send(emailSubscription.email);
      }
    } catch (error) {
      console.error(error);

      return res
        .status(INVALID_PAYLOAD.code)
        .send({ error: INVALID_PAYLOAD.error });
    }
  }
}

export default SubscribeController;
