import getUnsubscribeURL from '../utils/getUnsubscribeURL';

describe('getUnsubscribeURL', () => {
  test('should return default mail unsubscribe URL', () => {
    const email = 'test@example.com';
    const unsubscribeURL = getUnsubscribeURL(email);

    expect(unsubscribeURL).toEqual(
      `http://localhost:8000/unsubscribe?email=${email}`,
    );
  });

  test('should return URL with the passed host and port', () => {
    const email = 'test@example.com';
    const host = 'test.com';
    const port = 5000;
    const unsubscribeURL = getUnsubscribeURL(email, host, port);

    expect(unsubscribeURL).toEqual(
      `http://${host}:${port}/unsubscribe?email=${email}`,
    );
  });
});
