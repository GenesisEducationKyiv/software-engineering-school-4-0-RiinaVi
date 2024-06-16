import { Request, Response } from 'express';

import { createEmailSchema } from '../utils/validation';
import Email from '../entities/Email';
import emailRepository from '../repositories/EmailRepository';

const subscribe = async (
  req: Request,
  res: Response,
): Promise<Response | undefined> => {
  const { email } = req.body as { email: string };

  try {
    const { error: validationError } = createEmailSchema.validate({ email });

    if (validationError) {
      return res.status(400).send({
        error: { message: validationError.message.split('"').join('') },
      });
    }
    const foundEmail = await emailRepository.findOneBy({ email });

    if (foundEmail) {
      res.status(409).send({
        error: { message: 'Email already exists!' },
      });
    } else {
      const emailEntry = Email.create({ email });

      await emailRepository.save(emailEntry);

      res.send(emailEntry);
    }
  } catch (error) {
    console.error(error);

    return res.status(400).send({ error: { message: 'invalid payload' } });
  }
};

export default subscribe;
