import { createEmailSchema } from '../utils/validation';

describe('email validation', () => {
  it('should send error', () => {
    const value = { email: 'testexample.com' };
    const { error: validationError } = createEmailSchema.validate(value);

    expect(validationError?.message.split('"').join('')).toEqual(
      'email must be a valid email',
    );
  });

  it('should pass the validation', () => {
    const value = { email: 'test@example.com' };
    const { error: validationError } = createEmailSchema.validate(value);

    expect(validationError).toBeUndefined();
  });
});
