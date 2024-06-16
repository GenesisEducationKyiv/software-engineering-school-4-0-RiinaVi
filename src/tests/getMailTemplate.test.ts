import getMailTemplate from '../utils/getMailTemplate';

describe('getMailTemplate', () => {
  test('should return default mail template', () => {
    const email = 'test@example.com';
    const unsubscribeURL = `http://${process.env.SERVER_IP ?? 'localhost'}:${
      process.env.PORT ?? 8000
    }/unsubscribe?email=${email}`;

    const template = getMailTemplate(39, unsubscribeURL).trim();

    expect(template).toEqual(`<div style="font-size: 20px; text-align: center">
    <p>Hello, if you see this email, then you have previously subscribed to our updates.</p>
    <hr>
    <p>Current USD to UAH exchange rate is: </p>
    <p style="font-weight: bold; background: #dedede; padding: 22px">₴39</p>
    <p style="float: right; font-size: 18px;">Don't want to hear from us anymore? <br>You may&nbsp;<a href=http://localhost:8000/unsubscribe?email=test@example.com style="color: black;">unsubscribe</a></p>
  </div>`);
  });
});
