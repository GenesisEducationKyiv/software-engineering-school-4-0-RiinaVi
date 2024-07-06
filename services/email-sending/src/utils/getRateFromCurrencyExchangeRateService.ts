const getRateFromCurrencyExchangeRateService = async (): Promise<number> => {
  const response = await fetch(
    `http://${process.env.SERVER_IP ?? 'localhost'}:${
      process.env.CURRENCY_EXCHANGE_RATE_SERVICE_PORT ?? 8010
    }/rate`,
  );
  const { rate } = (await response?.json()) as { rate: number };

  return rate;
};

export default getRateFromCurrencyExchangeRateService;
