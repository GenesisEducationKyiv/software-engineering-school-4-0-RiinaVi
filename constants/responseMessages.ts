export interface CustomResponse {
  error?: {
    message: string;
  };
  message?: string;
  code: number;
}

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
  EMAIL_WAS_UNSUBSCRIBED: { message: 'Email was unsubscribed!', code: 200 },
  INVALID_STATUS_VALUE: {
    error: {
      message: 'Invalid status value',
    },
    code: 400,
  },
  INTERNAL_SERVER_ERROR: {
    error: { message: 'Internal Server Error :(' },
    code: 500,
  },
  NO_PROVIDER_AVAILABLE: {
    error: { message: 'No currency rate provider is available now' },
    code: 500,
  },
  API_KEY_NOT_FOUND: {
    error: { message: 'API key is not found' },
    code: 500,
  },
} as { [key: string]: CustomResponse };
