import EmailEntity from '../entities/EmailEntity';
import emailRepository from '../repositories/EmailRepository';
import { createEmailSchema } from '../utils/validation';

export default class EmailSubscriptionService {
  private readonly emailEntry: EmailEntity;

  constructor(email: string) {
    this.emailEntry = EmailEntity.create({ email });
  }

  get email() {
    return this.emailEntry;
  }

  validate() {
    const { error: validationError } = createEmailSchema.validate({
      email: this.emailEntry.email,
    });

    if (validationError) {
      return {
        error: { message: validationError.message.split('"').join('') },
      };
    }
  }

  async isExists() {
    const foundEmail = await emailRepository.findOneBy({
      email: this.emailEntry.email,
    });
    return Boolean(foundEmail);
  }

  async getExistedId() {
    const foundEmail = await emailRepository.findOneBy({
      email: this.emailEntry.email,
    });
    return foundEmail.id;
  }

  async subscribe() {
    await emailRepository.save(this.emailEntry);
  }

  async unsubscribe() {
    await emailRepository.delete({ id: this.emailEntry.id });
  }
}
