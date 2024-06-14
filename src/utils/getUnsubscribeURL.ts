const getUnsubscribeURL = (email: string) =>
  `http://${process.env.SERVER_IP ?? 'localhost'}:${
    process.env.PORT ?? 8000
  }/unsubscribe?email=${email}`;

export default getUnsubscribeURL;
