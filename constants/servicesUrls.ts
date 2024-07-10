export default {
  CURRENCY_EXCHANGE_RATE: `http://${process.env.SERVER_IP ?? 'localhost'}:${
    process.env.CURRENCY_EXCHANGE_RATE_SERVICE_PORT ?? 8010
  }`,
  EMAIL_SUBSCRIPTION: `http://${process.env.SERVER_IP ?? 'localhost'}:${
    process.env.EMAIL_SUBSCRIPTION_SERVICE_PORT ?? 8020
  }`,
};
