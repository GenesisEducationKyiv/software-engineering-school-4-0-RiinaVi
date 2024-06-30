import { createEmailSchema } from '../utils/validation';

describe('email validation', () => {
  it('should complain about not valid email', () => {
    const value = { email: 'testexample.com' };
    const { error: validationError } = createEmailSchema.validate(value);

    expect(validationError?.message.split('"').join('')).toEqual(
      'email must be a valid email',
    );
  });

  it('should complain about an empty email', () => {
    const value = { email: '' };
    const { error: validationError } = createEmailSchema.validate(value);

    expect(validationError?.message.split('"').join('')).toEqual(
      'email is not allowed to be empty',
    );
  });

  it('should pass the validation', () => {
    const value = { email: 'test@example.com' };
    const { error: validationError } = createEmailSchema.validate(value);

    expect(validationError).toBeUndefined();
  });
});
