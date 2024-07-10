const getUnsubscribeURL = (
  email: string,
  host = 'localhost',
  port = 8000,
): string => `http://${host}:${port}/unsubscribe?email=${email}`;

export default getUnsubscribeURL;
