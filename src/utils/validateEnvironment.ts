import responseMessages from '../constants/responseMessages';
import * as process from 'process';

const { API_KEY_NOT_FOUND } = responseMessages;

export default function validateEnvironment(): void {
  if (
    !process.env.CURRENCY_BEACON_API_KEY ||
    !process.env.CURRENCY_API_API_KEY
  ) {
    throw new Error(API_KEY_NOT_FOUND.error?.message);
  }
}
