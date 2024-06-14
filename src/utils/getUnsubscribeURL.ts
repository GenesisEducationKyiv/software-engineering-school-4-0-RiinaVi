const getUnsubscribeURL = (email: string) =>
  `http://${process.env.SERVER_IP ?? 'localhost'}:${
    process.env.PORT
  }/unsubscribe?email=${email}`;

export default getUnsubscribeURL;
