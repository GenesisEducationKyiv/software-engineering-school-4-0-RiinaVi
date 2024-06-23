import responseMessages from '../constants/responseMessages';

const { API_KEY_NOT_FOUND } = responseMessages;

export default function validateEnvironment(): void {
  if (!process.env.RATE_SOURCE_API_KEY) {
    throw new Error(API_KEY_NOT_FOUND.error?.message);
  }
}
