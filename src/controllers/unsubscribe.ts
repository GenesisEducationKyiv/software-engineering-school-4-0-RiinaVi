import { Request, Response } from 'express';

import { createEmailSchema } from '../utils/validation';
import emailRepository from '../repositories/EmailRepository';

const unsubscribe = async (
  req: Request,
  res: Response,
): Promise<Response | undefined> => {
  const { email } = req.query;

  try {
    const { error: validationError } = createEmailSchema.validate({ email });

    if (validationError) {
      return res.status(400).send({
        error: { message: validationError.message.split('"').join('') },
      });
    }
    const foundEmail = await emailRepository.findOneBy({ email } as {
      email: string;
    });

    if (!foundEmail) {
      res.status(409).send({
        error: { message: 'Email does not exist!' },
      });
    } else {
      await emailRepository.delete({ id: foundEmail.id });

      res.send({ message: 'Email was unsubscribed!' });
    }
  } catch (error) {
    console.error(error);

    return res.status(400).send({ error: { message: 'invalid payload' } });
  }
};

export default unsubscribe;
