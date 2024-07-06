const getAllEmailsFromEmailSubscriptionService = async (): Promise<
  { emails: string }[]
> => {
  const url = `http://${process.env.SERVER_IP ?? 'localhost'}:${
    process.env.EMAIL_SUBSCRIPTION_SERVICE_PORT ?? 8020
  }/emails`;
  const response = await fetch(url);
  const emails = (await response?.json()) as { emails: string }[];

  return emails;
};

export default getAllEmailsFromEmailSubscriptionService;
