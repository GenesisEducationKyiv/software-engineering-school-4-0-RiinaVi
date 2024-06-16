import EmailEntity from '../entities/EmailEntity';
import emailRepository from '../repositories/EmailRepository';
import { createEmailSchema } from '../utils/validation';

export default class EmailSubscriptionService {
  private readonly emailEntry: EmailEntity;

  constructor(email: string) {
    this.emailEntry = EmailEntity.create({ email });
  }

  get email(): EmailEntity {
    return this.emailEntry;
  }

  validate(): { error: { message: string } } | undefined {
    const { error: validationError } = createEmailSchema.validate({
      email: this.emailEntry.email,
    });

    if (validationError) {
      return {
        error: { message: validationError.message.split('"').join('') },
      };
    }
  }

  async isExists(): Promise<boolean> {
    const foundEmail = await emailRepository.findOneBy({
      email: this.emailEntry.email,
    });
    return Boolean(foundEmail);
  }

  async getExistedId(): Promise<string | undefined> {
    const foundEmail = await emailRepository.findOneBy({
      email: this.emailEntry.email,
    });
    return foundEmail?.id;
  }

  async subscribe(): Promise<void> {
    await emailRepository.save(this.emailEntry);
  }

  async unsubscribe(): Promise<void> {
    await emailRepository.delete({ id: this.emailEntry.id });
  }
}
