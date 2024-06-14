export default {
  EMAIL_DOES_NOT_EXIST: {
    error: { message: 'Email does not exist!' },
    code: 409,
  },
  EMAIL_ALREADY_EXISTS: {
    error: { message: 'Email already exist!' },
    code: 409,
  },
  INVALID_PAYLOAD: {
    error: { message: 'invalid payload' },
    code: 400,
  },
  EMAIL_WAS_UNSUBSCRIBED: { message: 'Email was unsubscribed!' },
  INVALID_STATUS_VALUE: {
    error: {
      message: 'Email was unsubscribed!',
    },
    code: 400,
  },
};
