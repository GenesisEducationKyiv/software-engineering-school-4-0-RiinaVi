import { Request, Response } from 'express';

import responseMessages from '../constants/responseMessages';
import EmailSubscriptionService from '../services/EmailSubscriptionService';

const { EMAIL_DOES_NOT_EXIST, INVALID_PAYLOAD, EMAIL_WAS_UNSUBSCRIBED } =
  responseMessages;

class UnsubscribeController {
  public async unsubscribe(req: Request, res: Response): Promise<Response> {
    const { email } = req.query;
    const emailSubscription = new EmailSubscriptionService(email as string);

    try {
      const validationError = emailSubscription.validate();
      if (validationError) {
        return res.status(INVALID_PAYLOAD.code).send({
          validationError,
        });
      }
      const emailId = await emailSubscription.getExistedId();

      if (emailId) {
        await emailSubscription.unsubscribe();

        res.send(EMAIL_WAS_UNSUBSCRIBED);
      } else {
        res
          .status(EMAIL_DOES_NOT_EXIST.code)
          .send({ error: EMAIL_DOES_NOT_EXIST.error });
      }
    } catch (error) {
      console.error(error);

      return res
        .status(INVALID_PAYLOAD.code)
        .send({ error: INVALID_PAYLOAD.error });
    }
  }
}

export default UnsubscribeController;
