import EmailEntity from '../entities/EmailEntity';
import emailRepository from '../repositories/EmailRepository';
import { createEmailSchema } from '../utils/validation';
import responseMessages from '../constants/responseMessages';

const { EMAIL_ALREADY_EXISTS, INVALID_PAYLOAD, EMAIL_DOES_NOT_EXIST } =
  responseMessages;

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

  async getExistingId(): Promise<string | undefined> {
    const foundEmail = await emailRepository.findOneBy({
      email: this.emailEntry.email,
    });
    return foundEmail?.id;
  }

  async save(): Promise<void> {
    await emailRepository.save(this.emailEntry);
  }

  async delete(): Promise<void> {
    await emailRepository.delete({ id: this.emailEntry.id });
  }

  async subscribe(): Promise<void> {
    const validationError = this.validate();
    if (validationError) {
      throw INVALID_PAYLOAD;
    }
    const alreadyExists = await this.isExists();

    if (alreadyExists) {
      throw EMAIL_ALREADY_EXISTS;
    }

    await this.save();
  }

  async unsubscribe(): Promise<void> {
    const validationError = this.validate();
    if (validationError) {
      throw INVALID_PAYLOAD;
    }
    const emailId = await this.getExistingId();

    if (!emailId) {
      throw EMAIL_DOES_NOT_EXIST;
    }

    await this.delete();
  }
}
