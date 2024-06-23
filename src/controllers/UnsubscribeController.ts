import { Request, Response } from 'express';

import responseMessages, {
  CustomResponse,
} from '../constants/responseMessages';
import EmailSubscriptionService from '../services/EmailSubscriptionService';

const { EMAIL_WAS_UNSUBSCRIBED } = responseMessages;

class UnsubscribeController {
  public async unsubscribe(
    req: Request,
    res: Response,
  ): Promise<Response | undefined> {
    const { email } = req.query;
    const emailSubscription = new EmailSubscriptionService(email as string);

    try {
      await emailSubscription.unsubscribe();

      res.send(EMAIL_WAS_UNSUBSCRIBED);
    } catch (error) {
      const typedError = error as CustomResponse;
      console.error(typedError);

      return res
        .status(typedError.code)
        .send({ error: typedError.error?.message });
    }
  }
}

export default UnsubscribeController;
